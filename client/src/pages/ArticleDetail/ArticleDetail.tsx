import { LoadingSpinner } from "@/components/spinner";
import Tag from "@/components/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppContext } from "@/context/app";
import { useArticleSlug } from "@/hooks/articles/queries/useArticleSlug";
import { formattedDate, Tags } from "@/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "./Comment";
import { useDeleteArticle } from "@/hooks/articles/mutations/useDeleteArticle";
import { EditArticle } from "./EditArticle";

const ArticleDetail = () => {
  const params = useParams();
  const { profile } = useContext(AppContext);
  const { setTag } = useContext(AppContext);

  const { article, isLoading } = useArticleSlug(params.slug as string);
  const { deleteArticle } = useDeleteArticle();

  const isMyArticle = article?.authorId === profile?.id;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1">
      <div className="container w-full bg-slate-600">
        <div className="h-[170px] ">
          <h2 className="text-6xl font-bold text-white text-start">
            {article?.title}
          </h2>
          <div className="flex items-center gap-12">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={article?.author?.avatar} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <CardDescription className="text-base text-green-500">
                  {article?.author?.username}
                </CardDescription>
                <CardDescription className="text-gray-400">
                  {formattedDate(article?.createdAt)}
                </CardDescription>
              </div>
            </CardHeader>
            {isMyArticle && (
              <CardHeader className="flex flex-row items-center gap-4">
                <div
                  onClick={() => deleteArticle(params.slug as string)}
                  className="flex items-center gap-2 p-2 border rounded-sm"
                >
                  <CardDescription className="text-base text-green-500">
                    <Trash2 />
                  </CardDescription>
                  <CardDescription className="text-gray-400">
                    Delete
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 p-2 border rounded-sm">
                  <CardDescription className="flex items-center w-full gap-2 text-base text-green-500">
                    <FilePenLine />
                    <EditArticle />
                  </CardDescription>
                </div>
              </CardHeader>
            )}
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <p>{article?.content}</p>
        <div className="flex gap-3">
          {article?.tags.map((tag: Tags) => (
            <Link to={"/"}>
              <Tag onClick={() => setTag(tag.name)} nameTag={tag.name} />
            </Link>
          ))}
        </div>
      </div>
      <Separator className="my-4" />
      <Comment />
    </div>
  );
};

export default ArticleDetail;
