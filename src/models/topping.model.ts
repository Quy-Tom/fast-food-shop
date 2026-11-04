import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { ProductTopping } from './product-topping.model.js';

import type { Product as ProductType } from './product.model.js';
@Table({ tableName: 'toppings', timestamps: true, underscored: true })
export class Topping extends Model {
  @Column({ type: DataType.STRING(120), allowNull: false, unique: true }) declare name: string;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false, defaultValue: 0 }) declare price: string;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }) declare isActive: boolean;
  @BelongsToMany(() => Product, () => ProductTopping) declare products: ProductType[];
}
