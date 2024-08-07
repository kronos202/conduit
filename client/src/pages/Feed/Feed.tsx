import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalFeed from "./GlobalFeed";
import MyFeed from "./MyFeed";

const Feed = () => {
  return (
    <Tabs defaultValue="global" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="global">Global Feed</TabsTrigger>
        <TabsTrigger value="own">Your Feed</TabsTrigger>
      </TabsList>
      <GlobalFeed />
      <MyFeed />
    </Tabs>
  );
};

export default Feed;
