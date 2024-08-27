import TvShowPageRightSideIcons from "./TvShowPageRightSideIcons";

const TvShowPageRightSide: React.FC<{
  tvShowData: any;
  isLoading: boolean;
}> = ({ tvShowData, isLoading }) => {
  if (isLoading) {
    return <p>Loading right side content..</p>;
  }
  return (
    <div className="flex justify-center sm:block sm:w-1/5">
      <div className="flex gap-2">
        <TvShowPageRightSideIcons />
      </div>
      <div>
        <p className="font-bold">Status</p>
        <p>{tvShowData.status}</p>
      </div>{" "}
      <div>
        <p className="font-bold">Original Language</p>
        <p>{tvShowData.original_language}</p>
      </div>{" "}
    </div>
  );
};

export default TvShowPageRightSide;
