import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './product.model.js';

import type { Product as ProductType } from './product.model.js';
@Table({ tableName: 'product_variants', timestamps: true, underscored: true })
export class ProductVariant extends Model {
  @ForeignKey(() => Product) @Column({ type: DataType.BIGINT, allowNull: false }) declare productId: string;
  @Column({ type: DataType.STRING(80), allowNull: false }) declare name: string;
  @Column({ type: DataType.STRING(80), allowNull: true, unique: true }) declare sku: string | null;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare price: string;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }) declare isActive: boolean;
  @BelongsTo(() => Product) declare product: ProductType;
}
