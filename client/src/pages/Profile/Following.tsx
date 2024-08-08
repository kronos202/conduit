import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useGetFollowing } from "@/hooks/follows/queries/useGetFollowing";
import { Link, useParams } from "react-router-dom";

const Following = () => {
  const params = useParams();

  const { following } = useGetFollowing(Number(params.id));

  return (
    <TabsContent value="following" className="grid w-full grid-cols-3">
      {following?.map((item) => (
        <Link to={`/profile/${item.followerId}`}>
          <Card>
            <CardContent className="flex items-center justify-center gap-4 text-black">
              <Avatar>
                <AvatarImage
                  src={item.follower.avatar}
                  alt="@shadcn"
                  className="cursor-pointer"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardContent>{item.follower.username}</CardContent>
                <CardContent>{item.follower.bio}</CardContent>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </TabsContent>
  );
};

export default Following;
