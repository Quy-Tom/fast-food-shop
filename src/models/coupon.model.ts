import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { OrderCoupon } from './order-coupon.model.js';

import type { OrderCoupon as OrderCouponType } from './order-coupon.model.js';
@Table({ tableName: 'coupons', timestamps: true, underscored: true })
export class Coupon extends Model {
  @Column({ type: DataType.STRING(50), allowNull: false, unique: true }) declare code: string;
  @Column({ type: DataType.STRING(255), allowNull: true }) declare description: string | null;
  @Column({ type: DataType.ENUM('PERCENT', 'FIXED'), allowNull: false }) declare discountType: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare discountValue: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: true }) declare maxDiscount: string | null;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }) declare minOrderAmount: string;
  @Column({ type: DataType.INTEGER, allowNull: true }) declare usageLimit: number | null;
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 }) declare usedCount: number;
  @Column({ type: DataType.DATE, allowNull: true }) declare startsAt: Date | null;
  @Column({ type: DataType.DATE, allowNull: true }) declare expiresAt: Date | null;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }) declare isActive: boolean;
  @HasMany(() => OrderCoupon) declare orderCoupons: OrderCouponType[];
}
