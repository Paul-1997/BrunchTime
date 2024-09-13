// 定义 Product 相关的接口
interface ProductDetails {
  category: string;
  content: string;
  description: string;
  id: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: string;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
}

interface ProductItem {
  final_total: number;
  id: string;
  product: ProductDetails;
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
}

export type { Order, ProductDetails, ProductItem, Products };
