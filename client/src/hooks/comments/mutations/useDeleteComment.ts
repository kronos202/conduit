import commentApi from "@/apis/comment.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteComment = (slug: string) => {
  const queryClient = useQueryClient();
  const { mutate: deleteComment, isSuccess } = useMutation({
    mutationFn: (commentId: number) =>
      commentApi.deleteComment(slug, commentId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["all-comments"] });
      toast.success("Xóa thành công comment");
    },
    onError() {
      toast.error("Xóa thất bại comment");
    },
  });
  return { deleteComment, isSuccess };
};
