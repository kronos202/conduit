import commentApi from "@/apis/comment.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = (slug: string) => {
  const { data } = useQuery({
    queryKey: queryKeys.allComments(),
    queryFn: () => commentApi.getAllComments(slug),
    select: (data) => data.data.data,
  });

  return { data };
};
