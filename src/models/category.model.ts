import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from './product.model.js';

import type { Product as ProductType } from './product.model.js';
@Table({ tableName: 'categories', timestamps: true, underscored: true })
export class Category extends Model {
  @Column({ type: DataType.STRING(120), allowNull: false, unique: true }) declare name: string;
  @Column({ type: DataType.TEXT, allowNull: true }) declare description: string | null;
  @Column({ type: DataType.STRING(500), allowNull: true }) declare imageUrl: string | null;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }) declare isActive: boolean;
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 }) declare sortOrder: number;
  @HasMany(() => Product) declare products: ProductType[];
}
