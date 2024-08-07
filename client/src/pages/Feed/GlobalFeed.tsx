import CardFeed from "@/components/CardFeed";
import { LoadingSpinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useGetArticles } from "@/hooks/articles/queries/useGetArticles";
import { useCallback, useRef } from "react";

const GlobalFeed = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetArticles();
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
    <TabsContent value="global">
      {articles?.map((article, index) =>
        index + 1 === articles.length ? (
          <CardFeed
            slug={article.slug}
            key={article.slug}
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
            key={article.slug}
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
        <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? <LoadingSpinner /> : " Load more..."}
        </Button>
      ) : (
        "khong co bai post nao"
      )}
    </TabsContent>
  );
};

export default GlobalFeed;
