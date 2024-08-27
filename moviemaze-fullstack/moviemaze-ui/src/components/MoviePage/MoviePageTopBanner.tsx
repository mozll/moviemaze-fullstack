import MoviePageTopButtons from "./MoviePageTopButtons";

const MoviePageTopBanner: React.FC<{ movieData: any; isLoading: boolean }> = ({
  movieData,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading your movie page...</div>;
  }
  return (
    <>
      <div className="flex items-center justify-center py-16 bg-gradient-to-r from-movieLightDark to-movieDarkestDark sm:mx-auto ">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto items-center justify-center md:flex">
          <img
            className="flex w-auto h-full mx-auto sm:mr-6 rounded-xl"
            src={`https://image.tmdb.org/t/p/w300/${movieData.poster_path}`}
            alt=""
          />
          <div className="py-12">
            <h1 className="px-6 pb-2 text-2xl font-bold text-white">
              {movieData.title}
            </h1>
            <div className="truncate ">
              <span className="flex gap-2 pl-6 text-white ">
                {movieData.release_date} •
                {movieData.genres.map((genre: { name: string }, id: number) => (
                  <span key={id}>{genre.name},</span>
                ))}
                • {movieData.runtime} minutes
              </span>
            </div>
            <MoviePageTopButtons />
            <div className="pl-6 text-white">
              <p className="py-1 italic">{movieData.tagline}</p>
              <h3 className="font-bold">Overview</h3>
              <p className="py-1">{movieData.overview}</p>
              <div className="flex justify-between pt-3 pb-5">
                <div className="flex flex-col mr-5 ">
                  <p className="font-bold">
                    {movieData.credits.crew.some(
                      (crewMember: any) => crewMember.job === "Director"
                    )
                      ? `${
                          movieData.credits.crew.find(
                            (crewMember: any) => crewMember.job === "Director"
                          ).name
                        }`
                      : "Director: N/A"}
                  </p>
                  <span className="">Director</span>
                </div>

                <div className="flex flex-col mr-5">
                  <p className="font-bold">
                    {movieData.credits.crew.some(
                      (crewMember: any) => crewMember.job === "Screenplay"
                    )
                      ? `${
                          movieData.credits.crew.find(
                            (crewMember: any) => crewMember.job === "Screenplay"
                          ).name
                        }`
                      : "Screenplay: N/A"}
                  </p>
                  <p>Screenplay</p>
                </div>

                <div className="flex flex-col">
                  <p className="font-bold">
                    {movieData.credits.crew.some(
                      (crewMember: any) => crewMember.job === "Producer"
                    )
                      ? `${
                          movieData.credits.crew.find(
                            (crewMember: any) => crewMember.job === "Producer"
                          ).name
                        }`
                      : "Producer: N/A"}
                  </p>
                  <p>Producer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePageTopBanner;
