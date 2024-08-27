import MovieScrollList from "../components/MovieScrollList/MovieScrollList";
import Searchbar from "../components/Searchbar";
import TrailerScrollList from "../components/TrailerScrollList/TrailerScrollList";

const Home = () => {
  return (
    <>
      <Searchbar />
      <div className="bg-movieMediumDark">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
          <MovieScrollList
            title="Recommended Movies"
            sortBy="popularity.desc"
          />
        </div>
      </div>
      <div className="bg-movieDarkestDark">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
          <TrailerScrollList title="Trending" />
        </div>
      </div>

      <div className="bg-movieMediumDark">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
          <MovieScrollList title="New Movies" sortBy="release_date.desc" />
        </div>
      </div>
    </>
  );
};

export default Home;
