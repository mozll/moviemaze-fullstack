import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../hooks/useMovies";
import apiClient from "../services/api-client";
import MoviePageTopBanner from "../components/MoviePage/MoviePageTopBanner";

import MoviePageLeftSide from "../components/MoviePage/MoviePageLeftSide";
import MoviePageRightSide from "../components/MoviePage/MoviePageRightSide"; //
import MovieReviews from "../components/MoviePage/MovieReviews";

const MoviePage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieData, setMovieData] = useState<Movie>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`
        );

        if (response.status === 200) {
          const movieData = response.data;
          setMovieData(movieData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      <MoviePageTopBanner movieData={movieData} isLoading={isLoading} />
      <div className="text-white bg-movieLightDark">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto flex">
          <MoviePageLeftSide movieData={movieData} isLoading={isLoading} />
          <MoviePageRightSide movieData={movieData} isLoading={isLoading} />
        </div>
      </div>
      <MovieReviews movieData={movieData} mediaType="movie" />
    </>
  );
};

export default MoviePage;
