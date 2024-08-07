import articleApi from "@/apis/article.api";
import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
  const { data: tags } = useQuery({
    queryKey: ["all-tag"],
    queryFn: () => articleApi.getAllTags(),
  });

  return { tags };
};
