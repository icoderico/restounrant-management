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
  role: "OWNER" | "CACHEIR" | "WAITER";
  phone: string;
  name: string;
  password: string;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
}
