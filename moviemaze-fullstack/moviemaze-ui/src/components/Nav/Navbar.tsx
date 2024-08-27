import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import movieMazeLogo from "../../assets/images/movieMazeLogo.png";
import Links from "./Links";
import DropdownLinks from "./DropdownLinks";
import * as data from "./links.json";

const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;
const mobileLinks = JSON.parse(linksString).mobileLinks;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

type Cookies = {
  user_username?: string;
  user_id?: string;
};

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userCookies, setUserCookies] = useState<Cookies>({});

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getUserCookies`, {
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setUserCookies(data.cookies);
        }
      } catch (error) {
        throw new Error("Error");
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserCookies({});
        window.location.href = "/login";
      } else {
        return;
      }
    } catch (error) {
      throw new Error("Error");
    }
  };

  return (
    <div className="bg-movieMediumDark">
      <div className="px-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
        <nav className="flex items-center justify-between h-16 nav">
          <div className="flex logo-container">
            <Link to="/">
              <img
                src={movieMazeLogo}
                alt="Logo"
                className="h-auto max-w-md w-36"
              />
            </Link>
          </div>
          <Links links={links} />
          <div className="relative" onClick={toggleDropdown}>
            {!userCookies.user_username && !userCookies.user_id ? (
              <Link
                to="/login"
                className="items-center justify-center hidden h-10 px-4 text-sm text-white rounded-lg md:flex hover:bg-movieLightDark focus:outline-none focus:outline-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                Login
              </Link>
            ) : (
              <div className="flex gap-6">
                <Link
                  to={`/profile/${userCookies.user_id}`}
                  className="text-white hover:underline hover:underline-offset-8"
                >
                  {userCookies.user_username}
                </Link>
                <button
                  className="text-white hover:underline hover:underline-offset-8"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 p-2 mr-6 text-sm text-gray-500 rounded-lg sm:mr-12 md:hidden hover:bg-movieLightDark focus:outline-none focus:outline-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="justify-end w-5 h-5 text-movieLightGreen"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              {showDropdown && <DropdownLinks links={mobileLinks} />}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
