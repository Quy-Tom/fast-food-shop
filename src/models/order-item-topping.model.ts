import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { OrderItem } from './order-item.model.js';
import { Topping } from './topping.model.js';

import type { OrderItem as OrderItemType } from './order-item.model.js';
import type { Topping as ToppingType } from './topping.model.js';
@Table({ tableName: 'order_item_toppings', timestamps: false, underscored: true })
export class OrderItemTopping extends Model {
  @ForeignKey(() => OrderItem) @Column({ type: DataType.BIGINT, allowNull: false }) declare orderItemId: string;
  @ForeignKey(() => Topping) @Column({ type: DataType.BIGINT, allowNull: true }) declare toppingId: string | null;
  @Column({ type: DataType.STRING(120), allowNull: false }) declare toppingName: string;
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 }) declare quantity: number;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare unitPrice: string;
  @BelongsTo(() => OrderItem) declare orderItem: OrderItemType;
  @BelongsTo(() => Topping) declare topping: ToppingType;
}
