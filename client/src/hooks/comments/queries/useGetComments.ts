import commentApi from "@/apis/comment.api";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = (slug: string) => {
  const { data } = useQuery({
    queryKey: ["all-comments"],
    queryFn: () => commentApi.getAllComments(slug),
    select: (data) => data.data.data,
  });

  return { data };
};
