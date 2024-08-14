import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useArticleSlug = (slug: string) => {
  const { data: article, isLoading } = useQuery({
    queryKey: queryKeys.getSlugArticles(slug),
    queryFn: () => articleApi.getArticleSlug(slug),
    enabled: !!slug,
    select: (data) => {
      return data.data.data;
    },
  });

  return { article, isLoading };
};
