import HomeBanner from "@/components/Banner";
import Feed from "../Feed";
import TagList from "../TagList/TagList";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <div className="container flex-1">
        <div className="flex">
          <div className="flex-[8]">
            <Feed />
          </div>
          <div className="flex-[2]">
            <TagList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
