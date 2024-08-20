import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMyArticles = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.getAllMyArticles(),
      queryFn: ({ pageParam = 1 }) => articleApi.getMyArticles(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam, allPageParams) => {
        return lastPage.data.data.totalPages === allPageParams.length
          ? undefined
          : lastPageParam + 1;
      },
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};
