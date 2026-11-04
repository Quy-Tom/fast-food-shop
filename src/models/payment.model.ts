import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.model.js';

import type { Order as OrderType } from './order.model.js';
@Table({ tableName: 'payments', timestamps: true, underscored: true })
export class Payment extends Model {
  @ForeignKey(() => Order) @Column({ type: DataType.BIGINT, allowNull: false }) declare orderId: string;
  @Column({ type: DataType.ENUM('CASH', 'CARD', 'BANK_TRANSFER', 'E_WALLET'), allowNull: false }) declare method: string;
  @Column({ type: DataType.ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED'), allowNull: false, defaultValue: 'PENDING' }) declare status: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare amount: string;
  @Column({ type: DataType.STRING(150), allowNull: true, unique: true }) declare transactionReference: string | null;
  @Column({ type: DataType.DATE, allowNull: true }) declare paidAt: Date | null;
  @BelongsTo(() => Order) declare order: OrderType;
}
