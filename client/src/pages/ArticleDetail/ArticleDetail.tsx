import Tag from "@/components/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FilePenLine, Trash2 } from "lucide-react";

const ArticleDetail = () => {
  return (
    <div className="flex-1">
      <div className="container w-full bg-slate-600">
        <div className="h-[170px] ">
          <h2 className="text-6xl font-bold text-white text-start">
            aaaaaaaaaaaaaaaaaa
          </h2>
          <div className="flex items-center gap-12">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
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
                <CardDescription className="text-gray-400">
                  Edit
                </CardDescription>
              </div>
            </CardHeader>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <p>aaaaaaaaaaaaaaaaaaaa</p>
        <div className="flex gap-3">
          <Tag nameTag="test" />
          <Tag nameTag="test" />
          <Tag nameTag="test" />
          <Tag nameTag="test" />
          <Tag nameTag="test" />
        </div>
      </div>
      <Separator className="my-4" />
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
          <Textarea className="rounded-b-none" />
          <div className="container flex items-center justify-between h-12 bg-gray-200">
            <Avatar className="">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button>Post Comment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
