import { Module } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryController } from './category.controller.js';
import { Category } from '../../models/index.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [SequelizeModule.forFeature([Category]), AuthModule],
  exports: [CategoryService]
})
export class CategoryModule {}
