import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetComments } from "@/hooks/comments/queries/useGetComments";
import { useCreateComment } from "@/hooks/comments/mutations/useCreateComment";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { formattedDate } from "@/lib/utils";
import { useDeleteComment } from "@/hooks/comments/mutations/useDeleteComment";
import { EditComment } from "./EditComment";
import { Comments } from "@/types/comment.type";

const Comment = () => {
  const params = useParams();
  const [comment, setComment] = useState("");
  const handleContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value); // Cập nhật nội dung khi người dùng nhập vào
  };

  const { create, isSuccess } = useCreateComment(params.slug as string);
  const { deleteComment } = useDeleteComment(params.slug as string);

  const { data } = useGetComments(params.slug as string);

  const handleCreate = () => {
    create(comment);
    if (isSuccess) {
      setComment("");
    }
  };

  return (
    <div className="w-full">
      {/* Input comment */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-2xl space-y-2">
          <Textarea
            onChange={handleContent}
            placeholder="Write a comment..."
            className="w-full p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-400"
          />
  
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Button
              onClick={handleCreate}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
  
      <Separator className="my-6" />
  
      {/* Comments list */}
      {data?.map((item: Comments) => (
        <div key={item.id} className="flex justify-center px-4 mb-6">
        <div className="flex items-center justify-between w-full max-w-3xl gap-4 px-4 py-3 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
  {/* Avatar + Author + Date */}
  <div className="flex items-center flex-shrink-0 gap-3">
    <Avatar className="w-10 h-10">
      <AvatarImage src={item.author.avatar || undefined} />
      <AvatarFallback>
        {item.author.username.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col text-sm">
      <span className="font-semibold text-gray-800">{item.author.username}</span>
      <span className="text-xs text-gray-400">{formattedDate(item.createdAt)}</span>
    </div>
  </div>

  {/* Nội dung comment */}
  <p className="flex-1 px-2 text-sm text-gray-700 truncate">{item.content}</p>

  {/* Actions */}
  <div className="flex items-center flex-shrink-0 gap-2">
    <button
      onClick={() => deleteComment(item.id)}
      className="text-red-500 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition"
      title="Delete"
    >
      <Trash className="w-4 h-4" />
    </button>
    <button
      className="text-gray-600 hover:text-green-600 p-1.5 rounded-full hover:bg-green-50 transition"
      title="Edit"
    >
      <EditComment
        key={`${item.id}-${item.authorId}-${item.articleId}`}
        commentId={item.id}
        contentD={item.content}
      />
    </button>
  </div>
</div>

        </div>
      ))}
    </div>
  );
  
  
};

export default Comment;
