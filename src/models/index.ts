  import { Role } from './role.model.js';
  import { User } from './user.model.js';
  import { Address } from './address.model.js';
  import { Category } from './category.model.js';
  import { Product } from './product.model.js';
  import { ProductVariant } from './product-variant.model.js';
  import { Topping } from './topping.model.js';
  import { ProductTopping } from './product-topping.model.js';
  import { Cart } from './cart.model.js';
  import { CartItem } from './cart-item.model.js';
  import { CartItemTopping } from './cart-item-topping.model.js';
  import { DiningTable } from './dining-table.model.js';
  import { Coupon } from './coupon.model.js';
  import { Order } from './order.model.js';
  import { OrderItem } from './order-item.model.js';
  import { OrderItemTopping } from './order-item-topping.model.js';
  import { Payment } from './payment.model.js';
  import { OrderCoupon } from './order-coupon.model.js';
  import { Review } from './review.model.js';

  export const databaseModels = [
    Role, User, Address, Category, Product, ProductVariant, Topping,
    ProductTopping, Cart, CartItem, CartItemTopping, DiningTable, Coupon,
    Order, OrderItem, OrderItemTopping, Payment, OrderCoupon, Review,
  ];

  export {
    Role, User, Address, Category, Product, ProductVariant, Topping,
    ProductTopping, Cart, CartItem, CartItemTopping, DiningTable, Coupon,
    Order, OrderItem, OrderItemTopping, Payment, OrderCoupon, Review,
  };
