import { axiosInstance } from "../axiosInstance";
import type { UserResponse } from "../types";

export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
