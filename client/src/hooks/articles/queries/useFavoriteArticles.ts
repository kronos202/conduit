import articleApi from "@/apis/article.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFavoriteArticles = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["get-all-favorite-articles"],
    queryFn: () => articleApi.getFavoriteArticles(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam, allPageParams) => {
      return lastPage.data.data.totalPages === allPageParams.length
        ? undefined
        : lastPageParam + 1;
    },
  });

  return { data, fetchNextPage, hasNextPage, isLoading };
};
