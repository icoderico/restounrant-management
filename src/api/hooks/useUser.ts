import { useMutation } from "@tanstack/react-query";
import type { UserRequest, UserResponse } from "../types";
import { toast } from "react-toastify";
import { createUser } from "../endpoints/user";

export const useUserCreate = () => {
  return useMutation<UserResponse, Error, UserRequest>({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Yaratildi");
    },
  });
};
