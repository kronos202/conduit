import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedByUserId from "./FeedByUserId";
import Follower from "./Follower";
import Following from "./Following";
import BannerProfile from "./BannerProfile";

const Profile = () => {
  return (
    <div>
      <BannerProfile />
      <Tabs defaultValue="own" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="own">Your Feed</TabsTrigger>
          <TabsTrigger value="follower">Follower</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <FeedByUserId />
        <Follower />
        <Following />
      </Tabs>
    </div>
  );
};

export default Profile;
