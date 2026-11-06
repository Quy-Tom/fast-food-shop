import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, CreateProductToppingDto, CreateProductVariantDto } from './dto/create-product.dto.js';
import { Sequelize } from 'sequelize';
import { CategoryService } from '../category/category.service.js';
import { InjectModel, InjectConnection } from '@nestjs/sequelize';
import { Product } from '../../models/product.model.js';
import Helper from '../../utils/helpers.js';
import { ProductVariant } from '../../models/product-variant.model.js';
import { ProductTopping } from '../../models/product-topping.model.js';
import { Topping } from '../../models/topping.model.js';

@Injectable()
export class ProductService {
    constructor(
        @InjectConnection()
        private readonly sequelize: Sequelize,
        private readonly categoryService: CategoryService,
        @InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(ProductVariant) private readonly productVariantModel: typeof ProductVariant,
        @InjectModel(Topping) private readonly toppingModel: typeof Topping,
        @InjectModel(ProductTopping) private readonly productToppingModel: typeof ProductTopping
    ) { }

    async findOne(id: number) {
        return this.productModel.findByPk(id, { raw: true });
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
}
