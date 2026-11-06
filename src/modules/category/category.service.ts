import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../models/index.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const existingCategory = await this.categoryModel.findOne({ where: { name: createCategoryDto.name } });
        
        if (existingCategory) {
            throw new BadRequestException(`Category with name "${createCategoryDto.name}" already exists.`);
        }

        return await this.categoryModel.create(createCategoryDto as any);
    }

    async findAll() {
        return await this.categoryModel.findAll({
            where: { isActive: true },
            order: [['sortOrder', 'ASC']],
            attributes: { exclude: ['sortOrder', 'createdAt', 'updatedAt'] },
        });
    }

    async findOne(id: number) {
        return await this.categoryModel.findByPk(id, {raw: true});
    }

    async update(id: number, updateCategoryDto: any) {
        const category = await this.categoryModel.findByPk(id);
        if (!category) {
            throw new BadRequestException(`Category with ID ${id} not found.`);
        }

        const hasChanges = Object.keys(updateCategoryDto).some(
           key => category.get(key) !== updateCategoryDto[key]
        );

        if (!hasChanges) {
            return "No changes made to the category";
        }

        await category.update(updateCategoryDto);

        return "Category updated successfully";
    }

    async delete(id: number) {
        await this.categoryModel.destroy({ where: { id }, cascade: true });
        return { message: "This category has been deleted successfully" };
    }
}