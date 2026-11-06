import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1)
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }
}
