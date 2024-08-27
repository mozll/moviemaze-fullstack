import { IconContext } from "react-icons";
import DropdownFilter from "../DropdownFilter";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import React from "react";
import { MovieQuery } from "../../App";
import MovieList from "./MovieList";
import genres from "../../data/genres";

interface Props {
  title: string;
  sortBy: string;
}

const MovieGrid = ({ title, sortBy }: Props) => {
  const initialMovieQuery: MovieQuery = {
    genre: "",
    mediaType: "",
    sortBy: sortBy,
    searchText: "",
  };

  const [movieQuery, setMovieQuery] = useState<MovieQuery>(initialMovieQuery);

  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const scrollListId = `${title.toLowerCase().replace(/ /g, "-")}-list`;

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
      const isAtLeftmost = e.target.scrollLeft === 0;
      const isAtRightmost =
        e.target.scrollLeft + e.target.clientWidth === e.target.scrollWidth;

      // if we're at the lefttmost position we will disable the left button
      setIsLeftButtonDisabled(isAtLeftmost);
      // if we're at the rightmost position we will disable the right button
      setIsRightButtonDisabled(isAtRightmost);
    }
  };

  const handleArrowClick = (scrollDirection: "left" | "right") => {
    const scrollList = document.querySelector(`#${scrollListId}`);

    if (scrollList) {
      if (scrollDirection === "left") {
        // Move it -332 pixels on x axis, to move it to the left
        scrollList.scrollBy(-282, 0);
      } else if (scrollDirection === "right") {
        // Move it 332 pixels on x axis, to move it to the right
        scrollList.scrollBy(282, 0);
      }
    }
  };

  return (
    <>
      {/* film katalog container */}
      <div className="flex flex-col w-full max-w-full py-8">
        <div className="flex flex-row mb-6">
          <h2 className="px-12 text-2xl font-semibold text-white">{title}</h2>
          <DropdownFilter
            onSelectData={(data) => {
              setMovieQuery({ ...movieQuery, genre: data.id.toString() });
            }}
            selectedData={movieQuery.genre}
            dataList={genres}
          />
        </div>
        <div className="relative">
          <div
            onScroll={handleScroll}
            className="flex flex-row w-full gap-8 px-12 overflow-x-scroll"
            id={scrollListId}
          >
            <div className="absolute top-0 left-0 z-10 h-full w-14 bg-gradient-to-r from-movieMediumDark via-movieMediumDark to-transparent"></div>
            <IconContext.Provider value={{ color: "white", size: "2em" }}>
              <button
                onClick={() => handleArrowClick("left")}
                disabled={isLeftButtonDisabled}
                className="absolute z-20 flex-col items-center justify-center hidden w-12 h-12 transition-colors -translate-y-1/2 rounded-full md:flex disabled:bg-gray-600 left-3 bg-movieLightGreen aspect-square top-1/2"
              >
                <FaArrowLeft />
              </button>
            </IconContext.Provider>
            <MovieList movieQuery={movieQuery} />
            <IconContext.Provider value={{ color: "white", size: "2em" }}>
              <button
                onClick={() => handleArrowClick("right")}
                disabled={isRightButtonDisabled}
                className="absolute z-20 flex-col items-center justify-center hidden w-12 h-12 transition-colors -translate-y-1/2 rounded-full md:flex disabled:bg-gray-600 right-3 bg-movieLightGreen aspect-square top-1/2"
              >
                <FaArrowRight />
              </button>
            </IconContext.Provider>
            <div className="absolute top-0 right-0 z-10 h-full w-14 bg-gradient-to-l from-movieMediumDark via-movieMediumDark to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieGrid;
