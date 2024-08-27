import MovieCardContainer from "../MovieCard/MovieCardContainer";
import MovieCard from "../MovieCard/MovieCard";
import MovieCardSkeleton from "../MovieCard/MovieCardSkeleton";
import useMovies from "../../hooks/useMovies";
import { MovieQuery } from "../../App";

interface Props {
  movieQuery: MovieQuery;
}

const MovieList = ({ movieQuery }: Props) => {
  const { data: movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = [...Array(20).keys()]; //20 skeletons, der bliver loaded in som default, før apiet er loaded

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading &&
        skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
        ))}
      {movies
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => {
          const modifiedMovie = { ...movie, media_type: "movie" };

          return (
            <MovieCardContainer key={modifiedMovie.id}>
              <MovieCard movie={modifiedMovie} />
            </MovieCardContainer>
          );
        })}
    </>
  );
};

export default MovieList;
