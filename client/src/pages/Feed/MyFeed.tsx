import CardFeed from "@/components/CardFeed";
import { LoadingSpinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useMyArticles } from "@/hooks/articles/queries/useMyArticles";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

const MyFeed = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyArticles();
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
    <TabsContent value="own">
      {articles?.map((article, index) =>
        index + 1 === articles.length ? (
          <Link to={`/article/${article.slug}`}>
            <CardFeed
              key={article.id}
              lastElementRef={lastElementRef}
              avatar={article.author.avatar}
              createdAt={article.createdAt}
              description={article.description}
              favoriteCount={article.favoriteCount}
              tags={article.tags}
              title={article.title}
              username={article.author.username}
            />
          </Link>
        ) : (
          <Link to={`/article/${article.slug}`}>
            <CardFeed
              key={article.id}
              avatar={article.author.avatar}
              createdAt={article.createdAt}
              description={article.description}
              favoriteCount={article.favoriteCount}
              tags={article.tags}
              title={article.title}
              username={article.author.username}
            />
          </Link>
        )
      )}
      <Button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? <LoadingSpinner /> : " Load more..."}
      </Button>
    </TabsContent>
  );
};

export default MyFeed;
