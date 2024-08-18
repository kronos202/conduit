import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { CreateArticleBodyType } from "@/schemaValidations/article.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateArticle = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: (data: CreateArticleBodyType) => articleApi.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getAllArticles() });
      queryClient.invalidateQueries({ queryKey: queryKeys.getAllMyArticles() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.getAllFavoriteArticles(),
      });
      toast.success("Tạo Article thành công");
      if (data) {
        navigate("/");
      }
    },
  });

  return { create, isPending };
};
