import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { useGetFollowers } from "@/hooks/follows/queries/useGetFollowers";
import { Link, useParams } from "react-router-dom";

const Follower = () => {
  const params = useParams();
  const { follower } = useGetFollowers(Number(params.id));

  return (
    <TabsContent value="follower" className="grid w-full grid-cols-3">
      {follower?.map((item) => (
        <Link to={`/profile/${item.followingId}`}>
          <Card>
            <CardContent className="flex items-center justify-center gap-4 text-black">
              <Avatar>
                <AvatarImage
                  src={item?.following?.avatar}
                  alt="@shadcn"
                  className="cursor-pointer"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardContent>{item?.following?.username}</CardContent>
                <CardContent>{item?.following?.bio}</CardContent>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </TabsContent>
  );
};

export default Follower;
