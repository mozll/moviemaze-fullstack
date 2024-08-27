import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard"; // Adjust the import path as needed
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
// Import the Movie type from your source code
import { Movie } from "../../hooks/useMovies"; // Adjust the import path as needed

// Create a mock movie object and assert its type to be Movie
const mockMovie: Movie = {
  adult: false,
  backdrop_path: "",
  belongs_to_collection: {
    id: 0,
    name: "",
    poster_path: "",
    backdrop_path: "",
  },
  budget: 0,
  first_air_date: "",
  genres: [],
  homepage: "",
  id: 1,
  imdb_id: "",
  known_for_department: "",
  media_type: "movie",
  name: "Sample Movie",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "/sample-poster.jpg",
  production_companies: [],
  production_countries: [],
  profile_path: "",
  release_date: "2023-01-01",
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: "",
  tagline: "",
  title: "Sample Movie",
  video: false,
  vote_average: 0,
  vote_count: 0,
};

test("renders MovieCard correctly", () => {
  render(
    <BrowserRouter>
      <MovieCard movie={mockMovie} />
    </BrowserRouter>
  );

  // You can replace this expectation with your actual test logic
  // For example, check if the movie title is displayed on the rendered component
  expect(screen.getByText("Sample Movie")).toBeInTheDocument();
});
