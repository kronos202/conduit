import followApi from "@/apis/follow.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const { mutate: unfollow } = useMutation({
    mutationFn: (id: number) => followApi.unfollowUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Unfollow thành công user");
    },
  });

  return { unfollow };
};
