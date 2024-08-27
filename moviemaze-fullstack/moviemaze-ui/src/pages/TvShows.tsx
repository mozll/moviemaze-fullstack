import { useState } from "react";
import { MovieQuery } from "../App";
import TvShowList from "../components/MovieScrollList/TvShowList";

const TvShows = () => {
  const initialMovieQuery: MovieQuery = {
    genre: "",
    mediaType: "",
    sortBy: "popularity.desc",
    searchText: "",
  };

  const [movieQuery] = useState<MovieQuery>(initialMovieQuery);

  return (
    <>
      <div className=" bg-movieDarkestDark">
        <h2 className="px-8 pt-8 text-2xl font-semibold text-center text-white">
          All Tv Shows
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-8 p-8">
          <TvShowList movieQuery={movieQuery} />
        </div>
      </div>
    </>
  );
};

export default TvShows;
