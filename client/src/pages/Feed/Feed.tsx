import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalFeed from "./GlobalFeed";
import MyFeed from "./MyFeed";
import TagFeed from "./TagFeed";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/app";

const Feed = () => {
  const { tag, setTag } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<string>("global");

  console.log("activeTab", activeTab);
  console.log("tag", tag);

  useEffect(() => {
    // Chuyển tab khi có giá trị tag
    if (tag) {
      setActiveTab("tag");
    }
  }, [tag]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTag("");
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="global">Global Feed</TabsTrigger>
        <TabsTrigger value="own">Your Feed</TabsTrigger>
        <TabsTrigger value="tag">Tag #{tag}</TabsTrigger>
      </TabsList>
      <GlobalFeed />
      <MyFeed />
      <TagFeed />
    </Tabs>
  );
};

export default Feed;
