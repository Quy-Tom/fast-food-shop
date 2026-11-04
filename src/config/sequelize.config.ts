import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
            dialect: configService.get<Dialect>('DB_DIALECT') || 'postgres',
            host: configService.get('DB_HOST'),
            port: Number(configService.get('DB_PORT') ?? 5432),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            autoLoadModels: true,
});