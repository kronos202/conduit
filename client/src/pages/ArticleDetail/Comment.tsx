import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { FilePenLine, Trash, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useGetComments } from "@/hooks/comments/queries/useGetComments";
import { useCreateComment } from "@/hooks/comments/mutations/useCreateComment";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { formattedDate } from "@/lib/utils";
import { useDeleteComment } from "@/hooks/comments/mutations/useDeleteComment";
import { EditComment } from "./EditComment";
import { AppContext } from "@/context/app";
import { Comments } from "@/types/comment.type";

const Comment = () => {
  const params = useParams();
  const { profile } = useContext(AppContext);
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
  console.log(profile);

  console.log(data);

  return (
    <div>
      <div className="h-[170px] flex justify-center ">
        <div className="flex items-center gap-12">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <CardDescription className="text-base text-green-500">
                Maksim Esteban
              </CardDescription>
              <CardDescription className="text-gray-400">
                Maksim Esteban
              </CardDescription>
            </div>
          </CardHeader>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex items-center gap-2 p-2 border rounded-sm">
              <CardDescription className="text-base text-green-500">
                <Trash2 />
              </CardDescription>
              <CardDescription className="text-gray-400">
                Delete
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-sm">
              <CardDescription className="text-base text-green-500">
                <FilePenLine />
              </CardDescription>
              <CardDescription className="text-gray-400">Edit</CardDescription>
            </div>
          </CardHeader>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-center w-full my-4">
        <div className="w-[50%]">
          <Textarea onChange={handleContent} className="rounded-b-none" />
          <div className="container flex items-center justify-between h-12 bg-gray-200">
            <Avatar className="">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button onClick={handleCreate}>Post Comment</Button>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      {data?.map((item: Comments) => (
        <div className="flex justify-center w-full my-4">
          <div className="w-[50%]">
            <div className="w-full min-h-14 border-[4px] rounded-b-none flex items-center justify-center">
              {item.content}
            </div>
            <div className="container flex items-center justify-between h-12 bg-gray-200">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm"> {item.author.username}</p>
                  <p className="text-sm">{formattedDate(item.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => deleteComment(item.id)}>
                  <Trash color="red" />
                </div>
                <div>
                  <EditComment
                    key={`${item.id}-${item.authorId}-${item.articleId}`}
                    commentId={item.id}
                    contentD={item.content}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
