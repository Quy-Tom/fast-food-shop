import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.model.js';
import { Coupon } from './coupon.model.js';

import type { Coupon as CouponType } from './coupon.model.js';
import type { Order as OrderType } from './order.model.js';
@Table({ tableName: 'order_coupons', timestamps: false, underscored: true })
export class OrderCoupon extends Model {
  @ForeignKey(() => Order) @Column({ type: DataType.BIGINT, primaryKey: true }) declare orderId: string;
  @ForeignKey(() => Coupon) @Column({ type: DataType.BIGINT, allowNull: true }) declare couponId: string | null;
  @Column({ type: DataType.STRING(50), primaryKey: true }) declare couponCode: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare discountAmount: string;
  @BelongsTo(() => Order) declare order: OrderType;
  @BelongsTo(() => Coupon) declare coupon: CouponType;
}
