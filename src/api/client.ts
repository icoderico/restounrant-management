import { axiosInstance } from "./axiosInstance";

export const get = async <T>(
  url: string,
  params?: any,
  headers?: any
): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params, headers });
  return response.data;
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
};
