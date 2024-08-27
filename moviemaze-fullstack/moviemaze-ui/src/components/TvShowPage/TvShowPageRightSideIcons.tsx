import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import movieDBLogo from "../../assets/images/movieDB.jpg";

const TvShowPageRightSideIcons = () => {
  return (
    <div className="flex items-center gap-3 pb-2 mt-10">
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
        <img src={movieDBLogo} alt="" className="rounded-full w-9 h-9" />
      </a>
    </div>
  );
};

export default TvShowPageRightSideIcons;
