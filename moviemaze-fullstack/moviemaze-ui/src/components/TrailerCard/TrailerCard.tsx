import { Movie } from "../../hooks/useMovies";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const TrailerCard = ({ movie }: Props) => {
  return (
    <div>
      <Link
        to={`/${movie.media_type == "tv" ? "tv-show" : movie.media_type}/${
          movie.id
        }`}
      >
        <img // movie poster
          src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt=""
          className="hover:cursor-pointer rounded-xl"
        />
      </Link>
      <section className="p-2 px-4 hover:cursor-pointer">
        {/* box under billede */}
        <section className="flex flex-col justify-between py-1">
          <h2
            className="w-[390px] max-w-full mb-3 overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap"
            title={movie.title ? movie.title : movie.name ? movie.name : "-"}
          >
            {movie.title ? movie.title : movie.name ? movie.name : "-"}
          </h2>
        </section>
      </section>
    </div>
  );
};

export default TrailerCard;
