import { Module, NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { LoggerMiddleware } from './middleware/logger.middleware.js';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sequelizeConfig } from './config/sequelize.config.js';
import { CategoryModule } from './modules/category/category.module.js';
import { UserModule } from './modules/user/user.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';
import { ProductModule } from './modules/product/product.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'fast_food_shop',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => sequelizeConfig(configService),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN'),
        },
      }),
      global: true
    }),
    CategoryModule,
    UserModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    //consumer.apply(LoggerMiddleware).forRoutes({ path: 'user', method: RequestMethod.GET });
    //consumer.apply(LoggerMiddleware).exclude({ path: 'user', method: RequestMethod.GET }).forRoutes('*');
  }
}
