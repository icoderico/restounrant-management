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
