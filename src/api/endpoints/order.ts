import { axiosInstance } from "../axiosInstance";
import type { OrderResponse } from "../types";

export const getOrders = async (): Promise<OrderResponse[]> => {
  try {
    const response = await axiosInstance.get<OrderResponse[]>("/order");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (data: any): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post<OrderResponse>("/order", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (data: any): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.patch<OrderResponse>(
      `/order/${data.id}`,
      data.payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleOrder = async (id: string): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get<OrderResponse>(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (id: string): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.delete<OrderResponse>(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
