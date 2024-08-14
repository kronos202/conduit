import commentApi from "@/apis/comment.api";
import { queryKeys } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateComment = (slug: string) => {
  const queryClient = useQueryClient();
  const { mutate: create, isSuccess } = useMutation({
    mutationFn: (content: string) => commentApi.createComment(slug, content),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKeys.allComments() });
      toast.success("Tạo thành công comment");
    },
    onError() {
      toast.error("Tạo thất bại comment");
    },
  });
  return { create, isSuccess };
};
