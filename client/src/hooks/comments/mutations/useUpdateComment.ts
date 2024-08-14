import commentApi from "@/apis/comment.api";
import { queryKeys } from "@/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateComment = (slug: string, content: string) => {
  const queryClient = useQueryClient();
  const { mutate: Update } = useMutation({
    mutationFn: (commentId: number) =>
      commentApi.updateComment(slug, commentId, content),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKeys.allComments() });
      toast.success("Update thành công comment");
    },
    onError() {
      toast.error("Update thất bại comment");
    },
  });
  return { Update };
};
