import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model.js';

import type { User as UserType } from './user.model.js';
@Table({ tableName: 'addresses', timestamps: true, underscored: true })
export class Address extends Model {
  @ForeignKey(() => User) @Column({ type: DataType.BIGINT, allowNull: false }) declare userId: string;
  @Column({ type: DataType.STRING(150), allowNull: false }) declare recipientName: string;
  @Column({ type: DataType.STRING(30), allowNull: false }) declare recipientPhone: string;
  @Column({ type: DataType.STRING(100), allowNull: false }) declare province: string;
  @Column({ type: DataType.STRING(100), allowNull: false }) declare district: string;
  @Column({ type: DataType.STRING(100), allowNull: false }) declare ward: string;
  @Column({ type: DataType.STRING(255), allowNull: false }) declare streetAddress: string;
  @Column({ type: DataType.STRING(500), allowNull: true }) declare note: string | null;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false }) declare isDefault: boolean;
  @BelongsTo(() => User) declare user: UserType;
}
