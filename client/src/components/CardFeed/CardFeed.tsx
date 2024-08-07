import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@radix-ui/react-icons";
import { Tags } from "@/lib/utils";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { useContext } from "react";
import { AppContext } from "@/context/app";

type Props = {
  avatar: string;
  username: string;
  createdAt: string;
  slug: string;
  favoritesCount: number;
  description: string;
  title: string;
  tags: Tags[];
  lastElementRef?: (node: HTMLDivElement | null) => void;
};

const CardFeed = ({
  avatar,
  title,
  createdAt,
  description,
  favoritesCount,
  tags,
  username,
  lastElementRef,
  slug,
}: Props) => {
  const formattedDate = (time: string) => format(parseISO(time), "dd/MM/yyyy");
  const { setTag } = useContext(AppContext);
  return (
    <Card ref={lastElementRef} className="cursor-pointer">
      <div className="flex items-center justify-between ">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <CardDescription className="text-base text-green-500">
              {username}
            </CardDescription>
            <CardDescription className="text-gray-400">
              {formattedDate(createdAt)}
            </CardDescription>
          </div>
        </CardHeader>
        <CardHeader>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-3 text-white bg-green-500"
          >
            <HeartIcon className="w-4 h-4" stroke="red" />
            <p>{favoritesCount}</p>
          </Button>
        </CardHeader>
      </div>
      <CardContent className="space-y-2">
        <Link to={`/articles/${slug}`}>
          <div className="space-y-1 text-start">
            <h3 className="text-2xl font-bold text-gray-800 hover:underline">
              {title}
            </h3>
            <p className="hover:underline">{description}</p>
          </div>
        </Link>
        <div className="flex items-center justify-between space-y-1">
          <p>Read more...</p>
          <div className="flex gap-3">
            {tags?.map((tag) => (
              <p
                onClick={() => setTag(tag.name)}
                key={tag.name}
                className="p-1 border border-gray-500 rounded-xl"
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardFeed;