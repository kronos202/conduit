import authApi from "@/apis/auth.api";
import { AppContext } from "@/context/app";
import { ErrorResponse, isAxiosUnprocessableEntityError } from "@/lib/utils";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const {
    mutate: login,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: LoginBodyType) => authApi.login(data),
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công");
      setIsAuthenticated(true);
      setProfile(data.data.data.user);
    },
    onError(error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse>(error)) {
        toast.error(error.response?.data.errors?.message);
      }
    },
  });

  return { login, isPending, isSuccess };
};
