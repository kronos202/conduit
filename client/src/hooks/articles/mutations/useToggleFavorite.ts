import articleApi from "@/apis/article.api";
import { AppContext } from "@/context/app";
import { User } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { profile, tag } = useContext(AppContext);

  const { mutate: favorite, isPending } = useMutation({
    mutationFn: (id: number) => articleApi.postToggleFavorite(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-articles"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-my-articles"] });
      queryClient.invalidateQueries({
        queryKey: ["get-all-favorite-articles"],
      });

      // Handle tag-specific query invalidation
      if (tag) {
        queryClient.invalidateQueries({
          queryKey: ["get-all-tag-articles", tag],
        });
      }

      if (
        data.data.data.favoritedBy.some((user: User) => user.id === profile?.id)
      ) {
        toast.success("Thích thành công");
      } else {
        toast.success("Hủy thích thành công");
      }
    },
  });

  return { favorite, isPending };
};
