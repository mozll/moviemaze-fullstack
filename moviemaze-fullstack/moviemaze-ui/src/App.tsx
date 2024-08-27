import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
import MoviePage from "./pages/MoviePage";
import TvShowPage from "./pages/TvShowPage";
import Movies from "./pages/Movies";
import People from "./pages/People";
import TvShows from "./pages/TvShows";
import SignUp from "./pages/SignUp";
import SignUpCompleted from "./pages/SignUpCompleted";
import Login from "./pages/Login";

export interface MovieQuery {
  genre: string;
  mediaType: string;
  sortBy: string;
  searchText: string;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/people" element={<People />} />
        <Route path="/tv-shows" element={<TvShows />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-completed" element={<SignUpCompleted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/tv-show/:tvShowId" element={<TvShowPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
