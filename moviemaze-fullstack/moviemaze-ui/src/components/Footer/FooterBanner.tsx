import { Link } from "react-router-dom";

const FooterBanner = () => {
  return (
    <div className="hidden text-white md:flex bg-moviePurple">
      <div className="px-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto justify-evenly lg:gap-28 md:gap-20 items-center flex">
        <h3 className="text-2xl font-bold whitespace-nowrap md:py-12">
          Join Today
        </h3>
        <p className="hidden py-4 lg:block">
          Get access to maintain your own custom personal lists, track what
          you’ve seen and search and filter for what to watch next -- regardless
          if it’s in theatres, on TV or available on popular streaming services
          like Disney Plus, Netflix, Amazon Prime Video, HBO Max, and Hayu.
        </p>
        <ul className="block mx-auto list-disc lg:hidden">
          <li className="block py-2 font-semibold lg:hidden whitespace-nowrap">
            Enjoy MovieMaze ad free
          </li>
          <li className="block py-2 font-semibold lg:hidden whitespace-nowrap">
            Maintain a personal watchlist
          </li>
          <li className="block py-2 font-semibold lg:hidden whitespace-nowrap">
            Log the movies and TV shows you've seen
          </li>
        </ul>
        <Link
          to="/signup"
          className="block px-10 py-2 font-semibold bg-movieLightGreen whitespace-nowrap"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default FooterBanner;
