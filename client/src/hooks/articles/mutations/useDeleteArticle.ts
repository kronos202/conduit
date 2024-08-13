import articleApi from "@/apis/article.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteArticle } = useMutation({
    mutationFn: (slug: string) => articleApi.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      toast.success("Xoa article thanh cong");
      navigate("/");
    },
  });
  return { deleteArticle };
};