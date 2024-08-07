import articleApi from "@/apis/article.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useTagArticles = (tag: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-all-tag-articles", tag],
      queryFn: () => articleApi.getTagArticles(tag),
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
