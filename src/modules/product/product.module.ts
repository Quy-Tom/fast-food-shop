import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../../models/product.model.js';
import { ProductVariant } from '../../models/product-variant.model.js';
import { Topping } from '../../models/topping.model.js';
import { CategoryModule } from '../category/category.module.js';
import { ProductTopping } from '../../models/product-topping.model.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [SequelizeModule.forFeature([Product, ProductVariant, Topping, ProductTopping]), CategoryModule, AuthModule]
})
export class ProductModule {}
