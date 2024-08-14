import commentApi from "@/apis/comment.api";
import { queryKeys } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteComment = (slug: string) => {
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isSuccess } = useMutation({
    mutationFn: (commentId: number) =>
      commentApi.deleteComment(slug, commentId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKeys.allComments() });
      toast.success("Xóa thành công comment");
    },
    onError() {
      toast.error("Xóa thất bại comment");
    },
  });
  return { deleteComment, isSuccess };
};
