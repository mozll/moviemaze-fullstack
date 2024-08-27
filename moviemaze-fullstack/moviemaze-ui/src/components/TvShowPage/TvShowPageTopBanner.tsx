import TvShowPageTopButtons from "./TvShowPageTopButtons";

const TvShowPageTopBanner: React.FC<{
  tvShowData: any;
  isLoading: boolean;
}> = ({ tvShowData, isLoading }) => {
  if (isLoading) {
    return <div>Loading your movie page...</div>;
  }
  return (
    <>
      <div className="flex justify-center">
        <p className="px-4 py-2">Overview</p>
        <p className="px-4 py-2">Media</p>
        <p className="px-4 py-2">Share</p>
      </div>
      <div className="flex items-center justify-center py-16 bg-gradient-to-r from-movieLightDark to-movieDarkestDark sm:mx-auto ">
        <div className="items-center justify-center md:flex md:w-3/5">
          <img
            className="flex w-auto h-full mx-auto sm:px-6 rounded-xl"
            src={`https://image.tmdb.org/t/p/w300/${tvShowData.poster_path}`}
            alt=""
          />
          <div className="py-12">
            <h1 className="px-6 pb-2 text-2xl font-bold text-white">
              {tvShowData.name}
            </h1>
            <div className="truncate ">
              <span className="flex gap-2 pl-6 text-white ">
                {tvShowData.first_air_date} •
                {tvShowData.genres.map(
                  (genre: { name: string }, id: number) => (
                    <span key={id}>{genre.name},</span>
                  )
                )}
                • {tvShowData.number_of_seasons} seasons
              </span>
            </div>
            <TvShowPageTopButtons />
            <div className="pl-6 text-white">
              <p className="py-1 italic">{tvShowData.tagline}</p>
              <h3 className="font-bold">Overview</h3>
              <p className="py-1">{tvShowData.overview}</p>
              <div className="flex justify-between pt-3 pb-5">
                <div className="flex flex-col mr-5 ">
                  <p className="font-bold">
                    {tvShowData.credits.crew.some(
                      (crewMember: any) => crewMember.job === "Director"
                    )
                      ? `${
                          tvShowData.credits.crew.find(
                            (crewMember: any) => crewMember.job === "Director"
                          ).name
                        }`
                      : "Director: N/A"}
                  </p>
                  <span className="">Director</span>
                </div>

                <div className="flex flex-col mr-5">
                  <p className="font-bold">
                    {tvShowData.credits.crew.some(
                      (crewMember: any) => crewMember.job === "Screenplay"
                    )
                      ? `${
                          tvShowData.credits.crew.find(
                            (crewMember: any) => crewMember.job === "Screenplay"
                          ).name
                        }`
                      : "Screenplay: N/A"}
                  </p>
                  <p>Screenplay</p>
                </div>

                <div className="flex flex-col">
                  <p className="font-bold">
                    {tvShowData.credits.crew.some(
                      (crewMember: any) => crewMember.job === "Producer"
                    )
                      ? `${
                          tvShowData.credits.crew.find(
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
      <div className="py-2"></div>
    </>
  );
};

export default TvShowPageTopBanner;
