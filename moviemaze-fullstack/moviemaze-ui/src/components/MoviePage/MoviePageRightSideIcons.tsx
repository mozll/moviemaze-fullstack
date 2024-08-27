import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import movieDBLogo from "../../assets/images/movieDB.jpg";

const MoviePageRightSideIcons = () => {
  return (
    <div className="flex items-center pb-2 gap-3 mt-10">
      <a className="" href="https://www.facebook.com/themoviedb/">
        <FaFacebook className="w-8 h-8 text-blue-600 hover:text-blue-700" />
      </a>
      <a href="https://twitter.com/themoviedb">
        <FaTwitter className="w-8 h-8 text-blue-500 hover:text-blue-600" />
      </a>

      <a href="https://www.instagram.com/tmdbmovies/">
        <FaInstagram className="w-8 h-8 text-purple-600 hover:text-purple-700" />
      </a>

      <a href="https://www.themoviedb.org/">
        <img src={movieDBLogo} alt="" className="w-9 h-9 rounded-full" />
      </a>
    </div>
  );
};

export default MoviePageRightSideIcons;
