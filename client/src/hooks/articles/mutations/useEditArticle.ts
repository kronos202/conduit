import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { UpdateArticleBodyType } from "@/schemaValidations/article.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useEditArticle = (slug: string) => {
  const queryClient = useQueryClient();
  const { mutate: editArticle } = useMutation({
    mutationFn: (body: UpdateArticleBodyType) => articleApi.update(slug, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getAllArticles() });
      toast.success("Update article thanh cong");
    },
  });
  return { editArticle };
};
