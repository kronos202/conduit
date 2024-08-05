import authApi from "@/apis/auth.api";
import {
  ErrorResponse,
  isAxiosConfligError,
  isAxiosUnprocessableEntityError,
} from "@/lib/utils";
import { RegisterBodyType } from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRegister = () => {
  const {
    mutate: register,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: RegisterBodyType) => authApi.registerAccount(data),
    onSuccess: () => {
      toast.success("Đăng ký thành công");
    },
    onError(error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
        toast.error(error.response?.data.errors?.message);
      } else if (isAxiosConfligError<ErrorResponse>(error)) {
        toast.error(error.response?.data.errors?.message);
      }
    },
  });

  return { register, isPending, isSuccess };
};
