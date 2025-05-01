import CardFeed from "@/components/CardFeed";
import { LoadingSpinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useFavoriteArticles } from "@/hooks/articles/queries/useFavoriteArticles";
import { useCallback, useRef } from "react";

const FavoriteFeed = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFavoriteArticles();
  const articles = data?.pages.flatMap((item) => item.data.data.items);
  const scrollRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (isFetchingNextPage) return;
      if (!hasNextPage) return;

      if (scrollRef.current) scrollRef.current.disconnect();

      scrollRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) scrollRef.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  return (
    <TabsContent value="favorite">
      {articles?.map((article, index) =>
        index + 1 === articles.length ? (
          <CardFeed
            userId={article.author.id}
            id={article.id}
            slug={article.slug}
            key={article.slug + index}
            lastElementRef={lastElementRef}
            avatar={article.author.avatar}
            createdAt={article.createdAt}
            description={article.description}
            favoritesCount={article.favoritesCount}
            tags={article.tags}
            title={article.title}
            username={article.author.username}
          />
        ) : (
          <CardFeed
            userId={article.author.id}
            id={article.id}
            key={article.slug + index}
            slug={article.slug}
            avatar={article.author.avatar}
            createdAt={article.createdAt}
            description={article.description}
            favoritesCount={article.favoritesCount}
            tags={article.tags}
            title={article.title}
            username={article.author.username}
          />
        )
      )}
      {articles?.length ? (
        <Button
          className={`${!isFetchingNextPage && "hidden"} `}
          disabled={!hasNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage && <LoadingSpinner />}
        </Button>
      ) : (
        <div className="flex flex-col items-center mt-8 text-gray-500">
    <p className="mt-4 text-lg">Không có bài viết nào.</p>
    <p className="text-sm text-gray-400">Hãy đăng bài đầu tiên hoặc theo dõi người khác.</p>
  </div>
      )}
    </TabsContent>
  );
};

export default FavoriteFeed;
