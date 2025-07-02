import { useMutation } from "@tanstack/react-query";
import { login } from "../endpoints/auth";
import type { LoginRequest, LoginResponse } from "../types";
import { toast } from "react-toastify";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
      toast.success("Muvaffaqiyatli kirdingiz");
    },
    onError: (error: any) => toast.error(error?.response?.data?.message),
  });
};
