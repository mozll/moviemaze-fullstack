import { Movie } from "../../hooks/useMovies";
import { Link } from "react-router-dom";
//import { useState } from "react";
import MovieRating from "../MovieRating/MovieRating";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  // Hook til onHover card

  // Hver af de importerede ikoner skal tildeles et ikon navn
  // med keys der repræsenterer slug af hvert ikon. (name:PlayStation, slug:playstation)

  return (
    <div>
      <Link
        to={`/${movie.media_type == "tv" ? "tv-show" : movie.media_type}/${
          movie.id
        }/`}
      >
        <img // game card image
          src={`http://image.tmdb.org/t/p/w500${
            movie.poster_path ? movie.poster_path : movie.profile_path
          }`}
          alt=""
          className="hover:cursor-pointer rounded-t-xl"
        />
      </Link>
      <section
        //onMouseEnter={() => setShowGameOnHoverCard(true)}
        //onClick={() => setShowGameOnHoverCard(true)}
        className="p-2 px-4 hover:cursor-pointer"
      >
        {/* box under billede */}
        <section className="flex flex-col justify-between py-1">
          <h2
            className="w-[250px] max-w-full mb-3 overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap"
            title={movie.title ? movie.title : movie.name}
          >
            {movie.title ? movie.title : movie.name}
          </h2>
          <div>
            {movie.media_type !== "person" && (
              <>
                <div className="flex flex-row justify-between mb-1">
                  {/*Stars rating */}
                  <p>Rating:</p>
                  <MovieRating rating={movie.vote_average} />
                </div>
                <div className="flex flex-row justify-between">
                  <p>Release date:</p>
                  {movie.release_date}
                </div>
              </>
            )}
            {movie.media_type === "person" && (
              <>
                <div className="flex flex-row justify-between">
                  <p>Known for:</p>
                  {movie.known_for_department}
                </div>
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default MovieCard;
