import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../models/index.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {}

    async create(createCategoryDto: CreateCategoryDto) {
        return await this.categoryModel.create(createCategoryDto as any);
    }

    async findAll() {
        return await this.categoryModel.findAll();
    }

    async findOne(id: number) {
        return await this.categoryModel.findByPk(id);
    }
}
