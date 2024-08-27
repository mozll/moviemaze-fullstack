import { FaList, FaHeart, FaBookmark, FaStar, FaPlay } from "react-icons/fa";

const TvShowPageTopButtons: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-3 md:flex-row">
      <button className="p-3 bg-white rounded-full text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaList className="" />
      </button>
      <button className="p-3 bg-white rounded-full text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaHeart />
      </button>
      <button className="p-3 bg-white rounded-full text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaBookmark />
      </button>
      <button className="p-3 bg-white rounded-full text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaStar />
      </button>
      <button className="flex items-center p-2 text-white rounded-full hover:outline outline-white">
        <FaPlay className="mr-2" />
        <p className="">Play trailer</p>
      </button>
    </div>
  );
};

export default TvShowPageTopButtons;
