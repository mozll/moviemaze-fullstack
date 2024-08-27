import movieMazeLogo from "../../assets/images/movieMazeLogo.png";
import FooterBanner from "./FooterBanner";
import CookieConsentComponent from "./CookieConsentComponent";

const Footer = () => {
  return (
    <div className="">
      <FooterBanner />
      <div className="flex text-white bg-movieLightDark">
        <div className="px-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto flex  justify-between">
          <img src={movieMazeLogo} alt="Logo" className="w-auto h-10 my-10" />
          <ul className="hidden my-10 lg:block">
            <li className="font-semibold">THE BASICS</li>
            <li className="py-2">About MovieMaze</li>
            <li className="py-2">Contact Us</li>
            <li className="py-2">Support Forums</li>
            <li className="py-2">System Status</li>
          </ul>
          <ul className="hidden my-10 lg:block">
            <li className="font-semibold">GET INVOLVED</li>
            <li className="py-2">Contribution Bible</li>
            <li className="py-2">Add New Movie</li>
            <li className="py-2">Add New TV Show</li>
          </ul>
          <ul className="hidden my-10 lg:block">
            <li className="font-semibold">COMMUNITY</li>
            <li className="py-2">Guidelines</li>
            <li className="py-2">Discussions</li>
            <li className="py-2">Leaderboard</li>
            <li className="py-2">Twitter</li>
          </ul>
          <ul className="hidden my-10 lg:block">
            <li className="font-semibold">LEGAL</li>
            <li className="py-2">Terms of Use</li>
            <li className="py-2">API Terms of Use</li>
            <li className="py-2">Privacy Policy</li>
            <li className="py-2">DMCA Takedown Request</li>
          </ul>
        </div>
      </div>
      <CookieConsentComponent />
    </div>
  );
};

export default Footer;
