import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, CreateProductToppingDto, CreateProductVariantDto } from './dto/create-product.dto.js';
import { Sequelize } from 'sequelize';
import { CategoryService } from '../category/category.service.js';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { Product } from '../../models/product.model.js';
import { ProductVariant } from '../../models/product-variant.model.js';
import { ProductTopping } from '../../models/product-topping.model.js';
import { Topping } from '../../models/topping.model.js';
import { Category } from '../../models/category.model.js';
import { FilterProductDto } from './dto/filter-product.js';
import { Op, WhereOptions } from 'sequelize' 
import { ConfigService } from '@nestjs/config';
import Helper from '../../utils/helpers.js';

@Injectable()
export class ProductService {
    constructor(
        @InjectConnection()
        private readonly sequelize: Sequelize,
        private readonly categoryService: CategoryService,
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(ProductVariant) private readonly productVariantModel: typeof ProductVariant,
        @InjectModel(Topping) private readonly toppingModel: typeof Topping,
        @InjectModel(ProductTopping) private readonly productToppingModel: typeof ProductTopping,
        private readonly configService: ConfigService
    ) { }

    async findOne(id: number) {
        return this.productModel.findByPk(id, {
             logging: console.log,
            include: [
                {
                    model: ProductVariant,
                    attributes: {
                        include: [[this.sequelize.literal(`"Product"."base_price" + "variants"."price"`), 'variantPrice']],
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: Category,
                    attributes: ['name', 'description']
                }
            ]
         });
    }

    async findOneBySlug(slug: string) {
        return this.productModel.findOne({ where: { slug }, raw: true });
    }

    async create(createProductDto: CreateProductDto) {
        const t = await this.sequelize.transaction();
        try {
            const category = await this.categoryService.findOne(createProductDto.categoryId)

            if (!category) throw new BadRequestException("Category is not exist")

            const productSlug = Helper.makeSlugFromString(createProductDto.name);
            const product = await this.findOneBySlug(productSlug);
            if (product) throw new BadRequestException("Product is exist");

            const payload: Record<string, any> = {
                name: createProductDto.name,
                basePrice: createProductDto.basePrice,
                categoryId: createProductDto.categoryId,
                imageUrl: createProductDto.imageUrl
            };

            if (createProductDto.description) payload.description = createProductDto.description

            const newProduct = await this.productModel.create(payload as any, { transaction: t });

            if (createProductDto.productVariants && createProductDto.productVariants.length > 0 && newProduct) {
                const productId = newProduct.id || newProduct.dataValues?.id;
                const productVariants = createProductDto.productVariants.map((productVariant: CreateProductVariantDto) => ({
                    ...productVariant,
                    productId
                }));

                await this.productVariantModel.bulkCreate(productVariants as any, { transaction: t });
            }

            if (
                createProductDto.productToppings && createProductDto.productToppings.length > 0 && newProduct
            ) {
                const productId = newProduct.id || newProduct.dataValues?.id;

                const toppingIds = createProductDto.productToppings.map((topping: CreateProductToppingDto) => topping.toppingId);
                const alreadyExists = await this.toppingModel.findAll({
                    where: {
                        id: toppingIds
                    },
                    attributes: ['id'],
                    transaction: t
                });

                if (alreadyExists.length !== new Set(toppingIds).size) {
                    throw new BadRequestException('Some toppings are not exist');
                }

                if (alreadyExists.length !== createProductDto.productToppings.length)
                    throw new BadRequestException("Some toppings are not exist")

                const productToppings = createProductDto.productToppings.map(
                    (productTopping: CreateProductToppingDto) => ({
                        ...productTopping,
                        productId
                    })
                );

                await this.productToppingModel.bulkCreate(
                    productToppings as any,
                    { transaction: t }
                );
            }
            await t.commit();
            return { message: 'Create product successfully' }
        } catch (error) {
            console.log(error);
            await t.rollback();
            throw new BadRequestException('Create product failed')
        }
    }

    async findAll(filterProductDto: FilterProductDto) {
        const {search,
               status,
               isFeatured,
               categoryId,
               sortBy,
               sortOrder,
               minPrice,
               maxPrice,
               page,
               limit
        } = filterProductDto;

        const whereClause: WhereOptions = {}; ;
        if(search !== undefined) {
            Object.assign(whereClause, { [Op.or]: [
                {name: {[Op.iLike]: `%${search}%`}},
                {description: {[Op.iLike]: `%${search}%`}}
            ] });
        }

        if(status !== undefined) whereClause.status = status;
        if(isFeatured !== undefined) whereClause.isActive = isFeatured;
        if(categoryId !== undefined) whereClause.categoryId = categoryId;

        const limitPage = Number(limit || this.configService.get<number>('LIMIT_PRODUCTS'));

        const currentPage = Number(page || 1);
        const offset = (currentPage - 1) * limitPage;

        if(minPrice !== undefined || maxPrice !== undefined) {
            whereClause.basePrice = {};
            if (minPrice !== undefined) whereClause.basePrice[Op.gte] = minPrice;
            if (maxPrice !== undefined) whereClause.basePrice[Op.lte] = maxPrice;
        }

        let orderClause: any[] = [];
        if(sortBy && sortOrder) {
            orderClause = [[sortBy, sortOrder]];
        } else {
            orderClause = [['createdAt', 'DESC']]
        }

        const {rows, count} = await this.productModel.findAndCountAll({
            where: whereClause,
            order: orderClause,
            limit: limitPage,
            offset: offset
        })

        const totalItems = Array.isArray(count) ? count.length : count;

        return {
            items: rows,
            pagiationMeta: {
                totalItems,
                currentPage,
                itemsPerPage: limitPage,
                totalPages: Math.ceil(totalItems / limitPage)
            }
        }

    }

    async removeHard(id: number) {
        await this.productModel.destroy({ where: {id}, cascade: true });
        return {message: 'This product has been deleted'};
    }

    async removeSoft(id: number) {
        await this.productModel.update({status : 'INACTIVE'}, {where: {id}});
        return {message: 'This product has been deleted'};
    }
}
