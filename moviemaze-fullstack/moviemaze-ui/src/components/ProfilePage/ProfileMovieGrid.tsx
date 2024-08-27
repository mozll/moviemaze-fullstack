import { MovieQuery } from "../../App";
import { useState } from "react";
import MovieList from "../MovieScrollList/MovieList";

const ProfileMovieGrid = () => {
  const initialMovieQuery: MovieQuery = {
    genre: "",
    mediaType: "",
    sortBy: "popularity.desc",
    searchText: "",
  };

  const [movieQuery] = useState<MovieQuery>(initialMovieQuery);

  return (
    <>
      <h2 className="px-8 pt-8 text-2xl font-semibold text-center text-white">
        My movies
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-8 p-8">
        <MovieList movieQuery={movieQuery} />
      </div>
    </>
  );
};

export default ProfileMovieGrid;
