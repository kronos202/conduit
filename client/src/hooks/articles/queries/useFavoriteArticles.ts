import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFavoriteArticles = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.getAllFavoriteArticles(),
      queryFn: ({ pageParam = 1 }) => articleApi.getFavoriteArticles(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam, allPageParams) => {
        return lastPage.data.data.totalPages === allPageParams.length
          ? undefined
          : lastPageParam + 1;
      },
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};
