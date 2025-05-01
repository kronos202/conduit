import HomeBanner from "@/components/Banner";
import Feed from "../Feed";
import TagList from "../TagList/TagList";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <div className="container flex-1">
        <div className="flex flex-col-reverse gap-6 md:flex-row">
          {/* Feed */}
          <div className="w-full md:w-2/3">
            <Feed />
          </div>

          {/* TagList */}
          <div className="flex justify-center w-full md:w-1/3 md:justify-start">
            <TagList />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
