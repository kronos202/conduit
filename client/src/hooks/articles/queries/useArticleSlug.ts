import articleApi from "@/apis/article.api";
import { useQuery } from "@tanstack/react-query";

export const useArticleSlug = (slug: string) => {
  const { data: article, isLoading } = useQuery({
    queryKey: ["get-slug-articles", slug],
    queryFn: () => articleApi.getArticleSlug(slug),
    enabled: !!slug,
    select: (data) => {
      return data.data.data;
    },
  });

  return { article, isLoading };
};
