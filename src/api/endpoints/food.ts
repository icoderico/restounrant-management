import { axiosInstance } from "../axiosInstance";
import type { Food } from "../types";

export const getFoods = async (): Promise<Food[]> => {
  try {
    const response = await axiosInstance.get<Food[]>("/product");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFood = async (data: any): Promise<Food> => {
  try {
    const response = await axiosInstance.post<Food>("/product", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFood = async (data: any): Promise<Food> => {
  try {
    const response = await axiosInstance.patch<Food>(
      `/product/${data.id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleFood = async (id: string): Promise<Food> => {
  try {
    const response = await axiosInstance.get<Food>(`/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFood = async (id: string): Promise<Food> => {
  try {
    const response = await axiosInstance.delete<Food>(`/product/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
