import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model.js';
import { DiningTable } from './dining-table.model.js';
import { OrderItem } from './order-item.model.js';
import { Payment } from './payment.model.js';
import { OrderCoupon } from './order-coupon.model.js';

import type { DiningTable as DiningTableType } from './dining-table.model.js';
import type { OrderCoupon as OrderCouponType } from './order-coupon.model.js';
import type { OrderItem as OrderItemType } from './order-item.model.js';
import type { Payment as PaymentType } from './payment.model.js';
import type { User as UserType } from './user.model.js';
@Table({ tableName: 'orders', timestamps: true, underscored: true })
export class Order extends Model {
  @Column({ type: DataType.STRING(40), allowNull: false, unique: true }) declare orderCode: string;
  @ForeignKey(() => User) @Column({ type: DataType.BIGINT, allowNull: true }) declare userId: string | null;
  @ForeignKey(() => DiningTable) @Column({ type: DataType.BIGINT, allowNull: true }) declare diningTableId: string | null;
  @Column({ type: DataType.ENUM('DINE_IN', 'TAKEAWAY', 'DELIVERY'), allowNull: false }) declare orderType: string;
  @Column({ type: DataType.ENUM('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'COMPLETED', 'CANCELLED'), allowNull: false, defaultValue: 'PENDING' }) declare status: string;
  @Column({ type: DataType.STRING(150), allowNull: false }) declare customerName: string;
  @Column({ type: DataType.STRING(30), allowNull: false }) declare customerPhone: string;
  @Column({ type: DataType.JSONB, allowNull: true }) declare deliveryAddress: Record<string, unknown> | null;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare subtotal: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }) declare discountAmount: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }) declare deliveryFee: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare totalAmount: string;
  @Column({ type: DataType.STRING(1000), allowNull: true }) declare note: string | null;
  @Column({ type: DataType.DATE, allowNull: false }) declare placedAt: Date;
  @BelongsTo(() => User) declare user: UserType;
  @BelongsTo(() => DiningTable) declare diningTable: DiningTableType;
  @HasMany(() => OrderItem) declare items: OrderItemType[];
  @HasMany(() => Payment) declare payments: PaymentType[];
  @HasMany(() => OrderCoupon) declare coupons: OrderCouponType[];
}
