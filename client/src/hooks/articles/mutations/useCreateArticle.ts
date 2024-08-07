import articleApi from "@/apis/article.api";
import { CreateArticleBodyType } from "@/schemaValidations/article.schema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateArticle = () => {
  const { mutate: create, isPending } = useMutation({
    mutationFn: (data: CreateArticleBodyType) => articleApi.create(data),
    onSuccess: () => {
      toast.success("Tạo Article thành công");
    },
  });

  return { create, isPending };
};
