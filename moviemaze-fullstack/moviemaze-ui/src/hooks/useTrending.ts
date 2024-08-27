import { MovieQuery } from "../App";
import useData from "./useData";
import { Movie } from "../hooks/useMovies";

const useTrending = (movieQuery: MovieQuery) =>
  useData<Movie>(
    `trending/${movieQuery.mediaType ? movieQuery.mediaType : "all"}/week`,
    {
      params: {},
    },
    [movieQuery]
  );

export default useTrending;
