import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get('all')
  async getAllCategories() {
    return await this.categoryService.findAll();
  }

  @Get('find/:id')
  async getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.findOne(id);
  }
}
