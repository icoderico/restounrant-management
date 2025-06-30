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

export const createUser = async (data: any): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post<UserResponse>("/user", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data: any): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.patch<UserResponse>(
      `/user/${data.id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await axiosInstance.get<UserResponse[]>("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleUser = async (id: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.delete<UserResponse>(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
