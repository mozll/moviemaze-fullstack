import { MovieQuery } from "../App";
import useData from "./useData";

// Interface Movie is for defining the type of the data we're getting from our API, we're also ímporting this interface in our MoviePage, so that we can have a specific type for our movieData, instead of any type
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  first_air_date: string;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  media_type: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{ id: number; name: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  profile_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

const useMovies = (movieQuery: MovieQuery) =>
  useData<Movie>(
    "discover/movie",
    {
      params: {
        sort_by: movieQuery.sortBy,
        with_genres: movieQuery.genre,
        "release_date.lte": formattedDate,
      },
    },
    [movieQuery]
  );

export default useMovies;
