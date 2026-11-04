import { Module } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CategoryController } from './category.controller.js';
import { Category } from '../../models/index.js';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [SequelizeModule.forFeature([Category])],
})
export class CategoryModule {}
