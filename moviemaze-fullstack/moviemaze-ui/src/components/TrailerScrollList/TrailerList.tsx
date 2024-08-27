import TrailerCardContainer from "../TrailerCard/TrailerCardContainer";
import TrailerCard from "../TrailerCard/TrailerCard";
import TrailerCardSkeleton from "../TrailerCard/TrailerCardSkeleton";
import useTrending from "../../hooks/useTrending";
import { MovieQuery } from "../../App";

interface Props {
  movieQuery: MovieQuery;
}

const TrailerList = ({ movieQuery }: Props) => {
  const { data: movies, error, isLoading } = useTrending(movieQuery);
  const skeletons = [...Array(20).keys()]; //20 skeletons, der bliver loaded in som default, før apiet er loaded

  return (
    <>
      {error && <p>{error}</p>}
      {isLoading &&
        skeletons.map((skeleton) => (
          <TrailerCardContainer key={skeleton}>
            <TrailerCardSkeleton />
          </TrailerCardContainer>
        ))}
      {movies
        .filter((movie) => movie.backdrop_path !== null)
        .map((movie) => (
          <TrailerCardContainer key={movie.id}>
            <TrailerCard movie={movie} />
          </TrailerCardContainer>
        ))}
    </>
  );
};

export default TrailerList;
