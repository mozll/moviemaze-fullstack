import MoviePageRightSideIcons from "./MoviePageRightSideIcons";

const MoviePageRightSide: React.FC<{
  movieData: any;
  isLoading: boolean;
}> = ({ movieData, isLoading }) => {
  if (isLoading) {
    return <p>Loading right side content..</p>;
  }
  return (
    <div className="sm:block flex justify-center sm:w-1/5">
      <div className="flex gap-2">
        <MoviePageRightSideIcons />
      </div>
      <div>
        <p className="font-bold">Status</p>
        <p>{movieData.status}</p>
      </div>{" "}
      <div>
        <p className="font-bold">Original Language</p>
        <p>{movieData.original_language}</p>
      </div>{" "}
      <div>
        <p className="font-bold">Budget</p>
        <p>{movieData.budget}</p>
      </div>{" "}
      <div>
        <p className="font-bold">Revenue</p>
        <p>{movieData.revenue}</p>
      </div>
    </div>
  );
};

export default MoviePageRightSide;
