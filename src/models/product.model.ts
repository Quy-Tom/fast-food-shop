import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Category } from './category.model.js';
import { ProductVariant } from './product-variant.model.js';
import { Topping } from './topping.model.js';
import { ProductTopping } from './product-topping.model.js';
import { Review } from './review.model.js';

import type { Category as CategoryType } from './category.model.js';
import type { ProductVariant as ProductVariantType } from './product-variant.model.js';
import type { Review as ReviewType } from './review.model.js';
import type { Topping as ToppingType } from './topping.model.js';
@Table({ tableName: 'products', timestamps: true, underscored: true })
export class Product extends Model {
  @ForeignKey(() => Category) @Column({ type: DataType.BIGINT, allowNull: false }) declare categoryId: string;
  @Column({ type: DataType.STRING(180), allowNull: false }) declare name: string;
  @Column({ type: DataType.STRING(200), allowNull: false, unique: true }) declare slug: string;
  @Column({ type: DataType.TEXT, allowNull: true }) declare description: string | null;
  @Column({ type: DataType.STRING(500), allowNull: true }) declare imageUrl: string | null;
  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false }) declare basePrice: string;
  @Column({ type: DataType.ENUM('ACTIVE', 'INACTIVE', 'SOLD_OUT'), allowNull: false, defaultValue: 'ACTIVE' }) declare status: string;
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false }) declare isFeatured: boolean;
  @BelongsTo(() => Category) declare category: CategoryType;
  @HasMany(() => ProductVariant) declare variants: ProductVariantType[];
  @BelongsToMany(() => Topping, () => ProductTopping) declare toppings: ToppingType[];
  @HasMany(() => Review) declare reviews: ReviewType[];
}
