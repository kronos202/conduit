import { UserPlus, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollowUser } from "@/hooks/follows/mutations/useFollowUser";
import { useContext } from "react";
import { AppContext } from "@/context/app";
import { useParams } from "react-router-dom";
import { useUnfollowUser } from "@/hooks/follows/mutations/useUnfollowUser";
import { useMe } from "@/hooks/auth/queries/useMe";
import { useGetById } from "@/hooks/auth/queries/useGetById";

const BannerProfile = () => {
  const { follow } = useFollowUser();
  const { unfollow } = useUnfollowUser();
  const { profile } = useContext(AppContext);
  const params = useParams();
  const { data: user } = useGetById(Number(params.id));
  const { data } = useMe();

  const isNotMyProfile = Number(profile?.id) !== Number(params.id);
  const isFollow = () =>
    data.following.some(
      (follower) => follower?.followerId === Number(params.id)
    );

  return (
    <div className="container mt-4 bg-green-500 w-full h-[170px] flex flex-col items-center justify-center gap-3">
      <h1 className="text-6xl font-bold text-white">{user?.username}</h1>

      {isNotMyProfile && (
        <>
          {isFollow() ? (
            <Button
              onClick={() => unfollow(Number(params.id))}
              variant={"destructive"}
              className="flex items-center gap-2"
            >
              <UserRoundX />
              <p>Unfollow</p>
            </Button>
          ) : (
            <Button
              onClick={() => follow(Number(params.id))}
              className="flex items-center gap-2"
            >
              <UserPlus />
              <p>Follow</p>
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default BannerProfile;
