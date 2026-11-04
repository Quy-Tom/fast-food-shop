import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model.js';
import { Product } from './product.model.js';
import { Order } from './order.model.js';

import type { Order as OrderType } from './order.model.js';
import type { Product as ProductType } from './product.model.js';
import type { User as UserType } from './user.model.js';
@Table({ tableName: 'reviews', timestamps: true, underscored: true })
export class Review extends Model {
  @ForeignKey(() => User) @Column({ type: DataType.BIGINT, allowNull: false }) declare userId: string;
  @ForeignKey(() => Product) @Column({ type: DataType.BIGINT, allowNull: false }) declare productId: string;
  @ForeignKey(() => Order) @Column({ type: DataType.BIGINT, allowNull: true }) declare orderId: string | null;
  @Column({ type: DataType.SMALLINT, allowNull: false }) declare rating: number;
  @Column({ type: DataType.TEXT, allowNull: true }) declare comment: string | null;
  @BelongsTo(() => User) declare user: UserType;
  @BelongsTo(() => Product) declare product: ProductType;
  @BelongsTo(() => Order) declare order: OrderType;
}
