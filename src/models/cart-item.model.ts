import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Cart } from './cart.model.js';
import { Product } from './product.model.js';
import { ProductVariant } from './product-variant.model.js';
import { CartItemTopping } from './cart-item-topping.model.js';

import type { Cart as CartType } from './cart.model.js';
import type { CartItemTopping as CartItemToppingType } from './cart-item-topping.model.js';
import type { Product as ProductType } from './product.model.js';
import type { ProductVariant as ProductVariantType } from './product-variant.model.js';
@Table({ tableName: 'cart_items', timestamps: true, underscored: true })
export class CartItem extends Model {
  @ForeignKey(() => Cart) @Column({ type: DataType.BIGINT, allowNull: false }) declare cartId: string;
  @ForeignKey(() => Product) @Column({ type: DataType.BIGINT, allowNull: false }) declare productId: string;
  @ForeignKey(() => ProductVariant) @Column({ type: DataType.BIGINT, allowNull: true }) declare productVariantId: string | null;
  @Column({ type: DataType.INTEGER, allowNull: false }) declare quantity: number;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare unitPrice: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) declare note: string | null;
  @BelongsTo(() => Cart) declare cart: CartType;
  @BelongsTo(() => Product) declare product: ProductType;
  @BelongsTo(() => ProductVariant) declare variant: ProductVariantType;
  @HasMany(() => CartItemTopping) declare toppings: CartItemToppingType[];
}
