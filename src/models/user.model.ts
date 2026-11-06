import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import { Role } from './role.model.js';
import { Address } from './address.model.js';
import { Cart } from './cart.model.js';
import { Order } from './order.model.js';
import { Review } from './review.model.js';

import type { Address as AddressType } from './address.model.js';
import type { Cart as CartType } from './cart.model.js';
import type { Order as OrderType } from './order.model.js';
import type { Review as ReviewType } from './review.model.js';
import type { Role as RoleType } from './role.model.js';
@Table({ tableName: 'users', timestamps: true, underscored: true })
export class User extends Model {
  @ForeignKey(() => Role) @Column({ type: DataType.BIGINT, allowNull: false }) declare roleId: string;
  @Column({ type: DataType.STRING(150), allowNull: false }) declare fullName: string;
  @Column({ type: DataType.STRING(255), allowNull: false, unique: true }) declare email: string;
  @Column({ type: DataType.STRING(30), allowNull: true, unique: true }) declare phone: string | null;
  @Column({ type: DataType.STRING(255), allowNull: false }) declare passwordHash: string;
  @Column({ type: DataType.ENUM('ACTIVE', 'INACTIVE', 'BLOCKED'), allowNull: false, defaultValue: 'ACTIVE' }) declare status: string;
  @BelongsTo(() => Role) declare role: RoleType;
  @HasMany(() => Address) declare addresses: AddressType[];
  @HasOne(() => Cart) declare cart: CartType;
  @HasMany(() => Order) declare orders: OrderType[];
  @HasMany(() => Review) declare reviews: ReviewType[];

  
  getUserWithoutPassword() {
    const { passwordHash: _, ...rest } = this.get({ plain: true });
    return rest;
  }
}
