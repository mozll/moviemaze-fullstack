const MoviePageLeftSide: React.FC<{ movieData: any; isLoading: boolean }> = ({
  movieData,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading your movie page...</div>;
  }

  return (
    <div className="flex flex-col sm:w-4/5">
      <div>
        <h1 className="pb-4 text-xl font-bold">Top Billed Cast</h1>
        <div className="flex flex-wrap gap-4">
          {movieData.credits.cast
            .slice(0, 12)
            .map((crewMember: any, id: number) => (
              <div className="w-32 gap-5 border" key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${crewMember.profile_path}`}
                  alt=""
                  className="h-auto max-w-full"
                />
                <p className="px-2 font-black">{crewMember.name}</p>
                <p className="px-2">{crewMember.character}</p>
              </div>
            ))}
        </div>
        <div className="flex py-2">
          <p className="font-bold underline">Link To Full Cast & Crew</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePageLeftSide;
