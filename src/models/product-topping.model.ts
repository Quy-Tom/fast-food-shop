import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Topping } from './topping.model.js';

@Table({ tableName: 'product_toppings', timestamps: false, underscored: true })
export class ProductTopping extends Model {
  @ForeignKey(() => Product) @Column({ type: DataType.BIGINT, primaryKey: true }) declare productId: string;
  @ForeignKey(() => Topping) @Column({ type: DataType.BIGINT, primaryKey: true }) declare toppingId: string;
}
