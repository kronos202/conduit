import articleApi from "@/apis/article.api";
import { CreateArticleBodyType } from "@/schemaValidations/article.schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCreateArticle = () => {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useMutation({
    mutationFn: (data: CreateArticleBodyType) => articleApi.create(data),
    onSuccess: (data) => {
      toast.success("Tạo Article thành công");
      if (data) {
        navigate("/");
      }
    },
  });

  return { create, isPending };
};
