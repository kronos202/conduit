import articleApi from "@/apis/article.api";
import { queryKeys } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useTagArticles = (tag: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.getAllTagArticles(tag),
      queryFn: ({ pageParam = 1 }) => articleApi.getTagArticles(tag, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam, allPageParams) => {
        return lastPage.data.data.totalPages === allPageParams.length
          ? undefined
          : lastPageParam + 1;
      },
      enabled: !!tag,
    });

  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};
