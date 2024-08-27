import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import TvShowPageTopBanner from "../components/TvShowPage/TvShowPageTopBanner";
import TvShowPageLeftSide from "../components/TvShowPage/TvShowPageLeftSide";
import TvShowPageRightSide from "../components/TvShowPage/TvShowPageRightSide";

export interface TvShow {
  adult: boolean;
  backdrop_path: string;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }>;
  episode_run_time: Array<number>;
  first_air_date: string;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: string;
  last_episode_to_air: { id: number; name: string };
  name: string;
  next_episode_to_air: number;
  networks: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{ id: number; name: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

const TvShowPage = () => {
  const { tvShowId } = useParams<{ tvShowId: string }>();
  const [tvShowData, setTvShowData] = useState<TvShow>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/tv/${tvShowId}?api_key=${apiKey}&append_to_response=credits`
        );

        if (response.status === 200) {
          const tvShowData = response.data;
          setTvShowData(tvShowData);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tvShowId]);

  return (
    <>
      <TvShowPageTopBanner tvShowData={tvShowData} isLoading={isLoading} />
      <div className="flex">
        <TvShowPageLeftSide tvShowData={tvShowData} isLoading={isLoading} />
        <TvShowPageRightSide tvShowData={tvShowData} isLoading={isLoading} />
      </div>
    </>
  );
};

export default TvShowPage;
