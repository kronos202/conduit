import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
  const { data: tags } = useQuery({
    queryKey: queryKeys.allTag(),
    queryFn: () => articleApi.getAllTags(),
  });

  return { tags };
};
