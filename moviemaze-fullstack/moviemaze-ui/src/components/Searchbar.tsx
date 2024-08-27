import React, { useState } from "react";
import MovieCard from "./MovieCard/MovieCard";
import MovieCardContainer from "./MovieCard/MovieCardContainer";
import apiClient from "../services/api-client";
import { Movie } from "../hooks/useMovies";

const Searchbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [delayedSearch, setDelayedSearch] = useState<NodeJS.Timeout | null>(
    null
  );

  const searchQuery = async (searchTerm: string) => {
    try {
      const response = await apiClient.get(`/search/multi?query=${searchTerm}`);
      if (response.status === 200) {
        setSearchResults(response.data.results);
      }
    } catch (error) {
      // console.error("An error occurred while fetching data: ", error);
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (delayedSearch) {
      clearTimeout(delayedSearch);
    }

    // Adjust this to fix the amount of time it should wait to perform a search. The button will always overwrite the delay timer.
    const newDelayedSearch = setTimeout(() => {
      searchQuery(newSearchTerm);
    }, 670);

    setDelayedSearch(newDelayedSearch);
  };

  return (
    <div className="text-white bg-movieDarkestDark sm:p-12">
      <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
        <h1 className="text-lg font-semibold sm:text-3xl">Welcome</h1>
        <h2 className="pt-2 text-lg font-normal sm:text-2xl">
          Millions of movies, TV shows, and people to discover. Explore now.
        </h2>
        <div className="pt-6 Searchbar">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              searchQuery(searchTerm); // Directly call searchResults
            }}
          >
            <div className="relative flex mx-auto">
              <input
                className="w-full max-w-xl py-1 pl-10 truncate bg-white text-movieDarkestDark"
                type="search"
                placeholder="Search for a movie, TV show, people...."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-movieMediumGreen"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="px-10 font-semibold bg-movieLightGreen hover-bg-movieMediumGreen"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div>
          <h2 className="pt-2 my-6 text-lg font-normal sm:text-2xl">
            {searchTerm !== ""
              ? searchResults.length > 0
                ? `MovieMaze has found movie magic for "${searchTerm}"`
                : `Searching MovieMaze for "${searchTerm}"...`
              : "Enter a search term to discover movie magic on MovieMaze"}
          </h2>

          <div className="flex flex-wrap items-center mt-8 justify between">
            {searchResults
              .filter((movie) => movie.media_type !== "person")
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <div className="m-1" key={movie.id}>
                  <MovieCardContainer>
                    <div>
                      <MovieCard movie={movie} />
                    </div>
                  </MovieCardContainer>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
