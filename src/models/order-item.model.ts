import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Order } from './order.model.js';
import { Product } from './product.model.js';
import { ProductVariant } from './product-variant.model.js';
import { OrderItemTopping } from './order-item-topping.model.js';

import type { Order as OrderType } from './order.model.js';
import type { OrderItemTopping as OrderItemToppingType } from './order-item-topping.model.js';
import type { Product as ProductType } from './product.model.js';
@Table({ tableName: 'order_items', timestamps: true, underscored: true })
export class OrderItem extends Model {
  @ForeignKey(() => Order) @Column({ type: DataType.BIGINT, allowNull: false }) declare orderId: string;
  @ForeignKey(() => Product) @Column({ type: DataType.BIGINT, allowNull: true }) declare productId: string | null;
  @ForeignKey(() => ProductVariant) @Column({ type: DataType.BIGINT, allowNull: true }) declare productVariantId: string | null;
  @Column({ type: DataType.STRING(180), allowNull: false }) declare productName: string;
  @Column({ type: DataType.STRING(80), allowNull: true }) declare variantName: string | null;
  @Column({ type: DataType.INTEGER, allowNull: false }) declare quantity: number;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare unitPrice: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare lineTotal: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) declare note: string | null;
  @BelongsTo(() => Order) declare order: OrderType;
  @BelongsTo(() => Product) declare product: ProductType;
  @HasMany(() => OrderItemTopping) declare toppings: OrderItemToppingType[];
}
