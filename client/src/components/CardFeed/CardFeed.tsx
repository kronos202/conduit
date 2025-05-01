import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@radix-ui/react-icons";
import { formattedDate, Tags } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@/context/app";
import { useToggleFavorite } from "@/hooks/articles/mutations/useToggleFavorite";

type Props = {
  avatar: string;
  username: string;
  createdAt: string;
  slug: string;
  favoritesCount: number;
  id: number;
  userId: number;
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
  id,
  userId,
}: Props) => {
  const { setTag } = useContext(AppContext);
  const { favorite } = useToggleFavorite();

  return (
    <Card
      ref={lastElementRef}
      className="p-4 transition-shadow duration-200 border border-gray-200 cursor-pointer hover:shadow-lg rounded-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        {/* User Info */}
        <Link to={`/profile/${userId}`} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt="@user" />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-green-600">{username}</span>
            <span className="text-sm text-gray-400">{formattedDate(createdAt)}</span>
          </div>
        </Link>
  
        {/* Like Button */}
        <Button
          onClick={() => favorite(id)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600"
        >
          <HeartIcon className="w-4 h-4 text-red-500" />
          <span>{favoritesCount}</span>
        </Button>
      </div>
  
      {/* Content */}
      <CardContent className="mt-4 space-y-3">
        <Link to={`/article/${slug}`}>
          <h3 className="text-xl font-bold text-gray-800 transition hover:text-green-600">
            {title}
          </h3>
          <p className="text-gray-600 hover:underline">{description}</p>
        </Link>
  
        {/* Footer: Read more + Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-sm text-blue-500 hover:underline">Read more...</p>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <span
                onClick={() => setTag(tag.name)}
                key={tag.name}
                className="px-2 py-1 text-xs transition bg-gray-100 border border-gray-300 rounded-full cursor-pointer hover:bg-green-100"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
};

export default CardFeed;
