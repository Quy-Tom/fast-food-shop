import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model.js';
import { CartItem } from './cart-item.model.js';

import type { CartItem as CartItemType } from './cart-item.model.js';
import type { User as UserType } from './user.model.js';
@Table({ tableName: 'carts', timestamps: true, underscored: true })
export class Cart extends Model {
  @ForeignKey(() => User) @Column({ type: DataType.BIGINT, allowNull: false, unique: true }) declare userId: string;
  @BelongsTo(() => User) declare user: UserType;
  @HasMany(() => CartItem) declare items: CartItemType[];
}
