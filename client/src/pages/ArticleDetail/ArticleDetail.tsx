import { LoadingSpinner } from "@/components/spinner";
import Tag from "@/components/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="w-full">
      {/* Banner */}
      <div className="w-full px-4 py-8 bg-slate-700">
        <div className="container max-w-5xl mx-auto space-y-6">
          {/* Title */}
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            {article?.title}
          </h2>
  
          {/* Author Info + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={article?.author?.avatar} alt="author" />
                <AvatarFallback>
                  {article?.author?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-green-400">
                  {article?.author?.username}
                </span>
                <span className="text-sm text-gray-300">
                  {formattedDate(article?.createdAt)}
                </span>
              </div>
            </div>
  
            {/* Edit/Delete buttons */}
            {isMyArticle && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => deleteArticle(params.slug as string)}
                  className="flex items-center gap-2 px-3 py-1 text-red-500 transition border border-red-500 rounded-md hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
  
                <div className="flex items-center gap-2 px-3 py-1 text-green-500 transition border border-green-500 rounded-md hover:bg-green-50">
                  <FilePenLine size={16} />
                  <EditArticle />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  
      {/* Content */}
      <div className="container max-w-5xl px-4 mx-auto mt-8 space-y-6">
        <p className="leading-relaxed text-gray-800 whitespace-pre-wrap">
          {article?.content}
        </p>
  
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article?.tags.map((tag: Tags) => (
            <Link to="/" key={tag.name}>
              <Tag
                onClick={() => setTag(tag.name)}
                nameTag={tag.name}
                className="px-2 py-1 text-sm transition bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-green-100"
              />
            </Link>
          ))}
        </div>
  
        <Separator className="my-6" />
  
        {/* Comments */}
        <Comment />
      </div>
    </div>
  );
  
};

export default ArticleDetail;
