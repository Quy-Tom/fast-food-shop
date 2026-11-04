import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CartItem } from './cart-item.model.js';
import { Topping } from './topping.model.js';

import type { CartItem as CartItemType } from './cart-item.model.js';
import type { Topping as ToppingType } from './topping.model.js';
@Table({ tableName: 'cart_item_toppings', timestamps: false, underscored: true })
export class CartItemTopping extends Model {
  @ForeignKey(() => CartItem) @Column({ type: DataType.BIGINT, primaryKey: true }) declare cartItemId: string;
  @ForeignKey(() => Topping) @Column({ type: DataType.BIGINT, primaryKey: true }) declare toppingId: string;
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 }) declare quantity: number;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare unitPrice: string;
  @BelongsTo(() => CartItem) declare cartItem: CartItemType;
  @BelongsTo(() => Topping) declare topping: ToppingType;
}
