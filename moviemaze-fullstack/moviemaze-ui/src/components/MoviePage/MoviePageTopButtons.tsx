import { FaList, FaHeart, FaBookmark, FaStar, FaPlay } from "react-icons/fa";

const MoviePageTopButtons: React.FC = () => {
  return (
    <div className="gap-2 px-6 py-3 flex flex-col md:flex-row items-center">
      <button className="p-3 rounded-full bg-white text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaList className="" />
      </button>
      <button className="p-3 rounded-full bg-white text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaHeart />
      </button>
      <button className="p-3 rounded-full bg-white text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaBookmark />
      </button>
      <button className="p-3 rounded-full bg-white text-movieMediumDark hover:bg-movieMediumDark hover:text-white hover:outline outline-white">
        <FaStar />
      </button>
      <button className="flex items-center p-2 rounded-full text-white hover:outline outline-white">
        <FaPlay className="mr-2" />
        <p className="">Play trailer</p>
      </button>
    </div>
  );
};

export default MoviePageTopButtons;
