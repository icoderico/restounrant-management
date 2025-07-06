export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: any;
}

export interface UserResponse {
  id: string;
  role: "OWNER" | "CASHER" | "WAITER";
  phone: string;
  name: string;
  password: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
}

export interface UserRequest extends UserResponse {}

export interface Food {
  id: string;
  name: string;
  price: number;
  restaurantId: string;
}

export interface OrderResponse {
  id: string;
  restaurantId: string;
  table: string;
  status: "COMPLETED" | "PENDING" | "CANCELLED"; // Agar boshqa holatlar bo‘lsa, kengaytiring
  total: number;
  createdAt: string;
  updatedAt: string;
  restaurant: Restaurant;
  OrderItem: OrderItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  logo: string | null;
  phone: string;
  tip: number;
  regionId: string;
  createdAt: string;
  updatedAt: string;
  income: number;
  outcome: number;
  balance: number;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  restaurantId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  price: number;
  image: string;
}
