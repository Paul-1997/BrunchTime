import type Product from './product';

export interface CartItem {
  id: string;
  product_id: string;
  qty: number;
  product: Product;
  final_total: number;
  total: number;
}

export interface Cart {
  carts: CartItem[];
  total: number;
  final_total: number;
}

export interface AddCartPayload {
  product_id: string;
  qty: number;
}
