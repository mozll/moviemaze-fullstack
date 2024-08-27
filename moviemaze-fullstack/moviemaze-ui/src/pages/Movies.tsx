import { useState } from "react";
import { MovieQuery } from "../App";
import MovieList from "../components/MovieScrollList/MovieList";

const Movies = () => {
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
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
          <h2 className="pt-8 text-2xl font-semibold text-center text-white">
            All movies
          </h2>
          <div className="flex flex-row flex-wrap justify-center gap-8 p-8">
            <MovieList movieQuery={movieQuery} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
