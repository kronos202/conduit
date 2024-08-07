import articleApi from "@/apis/article.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useArticlesByUserId = (userId: number) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-all-articles-by-userId"],
      queryFn: () => articleApi.getArticlesByUserId(userId),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam, allPageParams) => {
        return lastPage.data.data.totalPages === allPageParams.length
          ? undefined
          : lastPageParam + 1;
      },
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};
