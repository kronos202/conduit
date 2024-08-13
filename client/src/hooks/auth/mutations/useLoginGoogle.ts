import authApi from "@/apis/auth.api";
import { AppContext } from "@/context/app";
import { LoginGoogleBodyType } from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useLoginGoogle = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);

  const { mutate: loginGoogle } = useMutation({
    mutationFn: (data: LoginGoogleBodyType) => authApi.loginGoogle(data),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setProfile(data.data.data.user);
      toast.success("Đăng nhập thành công");
    },
  });

  return { loginGoogle };
};
