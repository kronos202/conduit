import authApi from "@/apis/auth.api";
import { AppContext } from "@/context/app";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

export const useLogout = () => {
  const { reset } = useContext(AppContext);

  const { mutate: logout } = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      reset();
    },
  });

  return { logout };
};
