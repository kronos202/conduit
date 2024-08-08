import followApi from "@/apis/follow.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  const { mutate: follow } = useMutation({
    mutationFn: (id: number) => followApi.followUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success("Follow thành công user");
    },
    onError: () => {
      toast.error("Bạn đã follow rồi");
    },
  });

  return { follow };
};
