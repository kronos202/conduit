import authApi from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useConfirmEmail = () => {
  const navigate = useNavigate();
  const { mutate: confirmEmail } = useMutation({
    mutationFn: (body: { hash: string }) => authApi.confirmEmail(body),
    onSuccess: () => {
      toast.success("Xác nhận email thành công");
      navigate("/login");
    },
  });

  return { confirmEmail };
};
