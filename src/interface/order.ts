import type Product from './product';

interface ProductItem {
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
}

interface Products {
  [key: string]: ProductItem;
}

// 定义 User 相关的接口
interface User {
  address: string;
  email: string;
  name: string;
  tel: string;
}

// 定义主接口
interface Order {
  create_at: number; // 时间戳
  id: string;
  is_paid: boolean;
  products: Products;
  total: number;
  user: User;
  num: number;
  message?: string;
}

export type { Order, ProductItem, Products };
