import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order.model.js';

import type { Order as OrderType } from './order.model.js';
@Table({ tableName: 'dining_tables', timestamps: true, underscored: true })
export class DiningTable extends Model {
  @Column({ type: DataType.STRING(30), allowNull: false, unique: true }) declare tableCode: string;
  @Column({ type: DataType.SMALLINT, allowNull: false }) declare capacity: number;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }) declare isActive: boolean;
  @Column({ type: DataType.STRING(255), allowNull: true }) declare note: string | null;
  @HasMany(() => Order) declare orders: OrderType[];
}
