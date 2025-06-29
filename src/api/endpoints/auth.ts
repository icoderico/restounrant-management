// src/api/endpoints/auth.ts
import { post } from "../client";
import type { LoginRequest, LoginResponse } from "../types";

export const login = (data: LoginRequest) => {
  return post<LoginResponse>("/user/login", data);
};
