import HomeBanner from "@/components/Banner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedByUserId from "./FeedByUserId";

const Profile = () => {
  return (
    <div>
      <HomeBanner />
      <Tabs defaultValue="own" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="own">Your Feed</TabsTrigger>
          <TabsTrigger value="global">Global Feed</TabsTrigger>
          <TabsTrigger value="favorite">Favorite Feed</TabsTrigger>
        </TabsList>
        <FeedByUserId />
        {/* list following */}
        {/* list follower */}
      </Tabs>
    </div>
  );
};

export default Profile;
