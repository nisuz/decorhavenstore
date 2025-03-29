
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  billingAddress: Address;
  deliveryAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  phone?: string;  // Added phone field for notifications
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  billingAddress: Address;
  deliveryAddress: Address;
  createdAt: string;
  transactionId?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'card' | 'esewa' | 'khalti' | 'banking' | 'connectips';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
