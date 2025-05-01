import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalFeed from "./GlobalFeed";
import MyFeed from "./MyFeed";
import TagFeed from "./TagFeed";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/app";
import FavoriteFeed from "./FavoriteFeed";

const Feed = () => {
  const { tag, setTag, isAuthenticated } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<string>("global");

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
  {/* Tab List: Responsive + Scrollable */}
  <TabsList
  className="flex w-full overflow-x-auto bg-white border-b border-gray-200 no-scrollbar scroll-smooth snap-x snap-mandatory"
>
  <TabsTrigger
    value="global"
    className="min-w-[120px] snap-start shrink-0 px-4 py-2 text-sm text-center whitespace-nowrap hover:text-green-600"
  >
    Global Feed
  </TabsTrigger>

  

  {isAuthenticated && (
    <>
      <TabsTrigger
        value="own"
        className="min-w-[120px] snap-start shrink-0 px-4 py-2 text-sm text-center whitespace-nowrap hover:text-green-600"
      >
        Your Feed
      </TabsTrigger>
      <TabsTrigger
    value="favorite"
    className="min-w-[120px] snap-start shrink-0 px-4 py-2 text-sm text-center whitespace-nowrap hover:text-green-600"
  >
    Favorite Feed
  </TabsTrigger>
      
  {tag && (
        <TabsTrigger
          value="tag"
          className="min-w-[140px] snap-start shrink-0 px-4 py-2 text-sm text-center whitespace-nowrap hover:text-green-600"
        >
          Tag <span className="font-medium text-green-700">#{tag}</span>
        </TabsTrigger>
      )}
    </>
  )}

</TabsList>


  {/* Feed Content */}
  <div className="mt-6 min-h-[300px]">
    {activeTab === "global" && <GlobalFeed />}
    {activeTab === "own" && isAuthenticated && <MyFeed />}
    {activeTab === "favorite" && isAuthenticated && <FavoriteFeed />}
    {activeTab === "tag" && isAuthenticated && <TagFeed />}
  </div>
</Tabs>

  );
};

export default Feed;
