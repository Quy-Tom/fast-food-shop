import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { databaseModels } from '../models/index.js';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  console.log('DATABASE CONFIG:', {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USERNAME'),
    dialect: configService.get('DB_DIALECT') || 'postgres',
  });

  console.log('MODEL COUNT:', databaseModels.length);
  console.log('REGISTERED MODEL NAMES:', databaseModels.map(model => model.name));

  return {
    dialect: configService.get<Dialect>('DB_DIALECT') || 'postgres',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT') ?? 5432),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),

    autoLoadModels: true,
    synchronize: true,
    sync: { alter: false }, // Set to false to prevent automatic schema changes in production
    logging: false,
    models: databaseModels,
  };
};