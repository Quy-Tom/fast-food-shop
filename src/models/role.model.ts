import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './user.model.js';

import type { User as UserType } from './user.model.js';
@Table({ tableName: 'roles', timestamps: true, underscored: true })
export class Role extends Model {
  @Column({ type: DataType.STRING(50), allowNull: false, unique: true }) declare name: string;
  @Column({ type: DataType.STRING(255), allowNull: true }) declare description: string | null;
  @HasMany(() => User) declare users: UserType[];
}
