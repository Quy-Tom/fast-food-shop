import { ArrayNotRequired, NumberRequired, StringNotRequired, StringRequired } from "../../../common/decorators/index.js";

export class CreateProductVariantDto {
    @StringRequired("Variant Name")
    name: string;

    @StringNotRequired("SKU")
    sku?: string;

    @NumberRequired({
        name: "Price",
        min: 0,
        max: 10000
    })
    price: number;

    @NumberRequired({
        name: "Price",
        min: 1,
        max: 10000
    })
    productId: number;

}

export class CreateProductToppingDto {
    @NumberRequired({name: 'Topping Id', min: 1, max: 10000})
    toppingId: number

    @NumberRequired({name: 'Product Id', min: 1, max: 10000})
    productId: number
}

export class CreateProductDto {
    @StringRequired("Product Name")
    name: string;

    @StringNotRequired("Description")
    description: string;

    @NumberRequired({name: "Price", min: 0, max: 10000})
    basePrice: number;

    @NumberRequired({name: "CategoryId", min: 0, max: 10000})
    categoryId: number;

    @StringNotRequired("Description")
    imageUrl: string;

    @ArrayNotRequired(CreateProductVariantDto)
    productVariants: CreateProductVariantDto[];

    @ArrayNotRequired(CreateProductToppingDto)
    productToppings: CreateProductToppingDto[];
}