import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MovieRating from "../MovieRating/MovieRating";
import { Movie } from "../../hooks/useMovies";
import { fetchMovieReviews } from "../../../apiService";
import Star from "./MovieRatingInput";

interface FormData {
  rating: number;
  headline: string;
  review: string;
  id: number;
  type: string;
}
interface ErrorPostData {
  status: string;
  message: string;
}

interface Props {
  movieData: Movie | any;
  mediaType: string;
}

export interface Review {
  review_id: number;
  review_title: string;
  review_text: string;
  review_created_at: any;
  review_rating: number;
  review_public: number;
  review_status: number;
  user_username: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const MovieReviews = ({ movieData }: Props) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleSelect = (value: number) => {
    // Update the rating in formData
    setFormData({
      ...formData,
      rating: value,
    });
    setSelectedRating(value);
  };

  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    headline: "",
    review: "",
    id: 0,
    type: "movie",
  });

  const [errorPost, setErrorPost] = useState<ErrorPostData>({
    status: "",
    message: "",
  });

  const [movieReviewsData, setMovieReviewsData] = useState<Review[] | null>(
    null
  );

  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorGet, setErrorGet] = useState("");

  let averageRating = 0;

  if (movieReviewsData !== null && movieReviewsData.length !== 0) {
    // Calculate the average rating
    const totalRating = movieReviewsData.reduce(
      (sum, review) => sum + review.review_rating,
      0
    );
    averageRating = totalRating / movieReviewsData.length;
  }

  useEffect(() => {
    if (movieData && movieData.id) {
      // Convert the userId to a number before making the API call
      const numericMovieId = Number(movieData.id);
      if (!isNaN(numericMovieId)) {
        fetchMovieReviews(numericMovieId)
          .then((movieReviews) => {
            setMovieReviewsData(movieReviews);
            setLoadingReviews(false);
          })
          .catch((err) => {
            setErrorGet(err.message);
            setLoadingReviews(false);
          });
      } else {
        setErrorGet("Invalid movie ID");
        setLoadingReviews(false);
      }
    }
  }, [movieData]);

  if (loadingReviews) {
    return <div>Loading reviews...</div>;
  }

  if (errorGet) {
    return <div>Error loading reviews: {errorGet}</div>;
  }

  if (!movieReviewsData) {
    return <div>No reviews found.</div>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      id: movieData.id,
    }));
  };
  const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      id: movieData.id,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Make the POST request to API
      fetch(`${API_BASE_URL}/reviews/add`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message);
            });
          }
          return response.json();
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          // Handle errors here
          setErrorPost((prevData) => ({
            ...prevData,
            status: "error",
            message: error.message || "An error occurred.",
          }));
        });
    } catch (error: any) {
      // Handle validation or API request error
      setErrorPost((prevData) => ({
        ...prevData,
        status: "error",
        message: error.message || "An error occurred.",
      }));
    }
  };

  return (
    <>
      <svg className="hidden">
        <symbol
          id="star"
          width="32"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.77 11.857H19.74L15.99.5l-3.782 11.357H0l9.885 6.903-3.692 11.21 9.736-7.05 9.796 6.962-3.722-11.18 9.766-6.845z"
            fill="currentColor"
          />
        </symbol>
      </svg>

      <div className="text-white bg-movieDarkestDark">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
          <h2 className="pb-4 text-xl font-bold ">Reviews</h2>
          <div>
            <MovieRating rating={averageRating} />
            <span className=" relative -top-[3px] pl-2">
              based on {movieReviewsData.length} reviews
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/2 p-8 mt-4 border border-white ">
              <h3 className="pb-4 text-lg font-bold">Add your review</h3>
              <p className="mb-4 text-lg italic">{errorPost.message}</p>
              <label>Rating:</label>
              <div className="flex mt-1 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    value={value * 2} // Ganger med 2 da vi kører 0-10 i databasen, og ikke 0-5
                    selectedRating={selectedRating}
                    onSelectRating={handleSelect}
                  />
                ))}
              </div>
              <label>Headline:</label>
              <input
                type="text"
                className="mb-4 text-movieDarkestDark"
                id="headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
              />
              <label>Review:</label>
              <textarea
                className="mb-4 text-movieDarkestDark"
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChangeTextarea}
              ></textarea>
              <input
                type="hidden"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              <input
                type="hidden"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              <div className="flex justify-end">
                <button className="px-10 py-2 font-semibold bg-movieLightGreen whitespace-nowrap">
                  Submit review
                </button>
              </div>
            </div>
          </form>
          <div className="mt-16">
            {movieReviewsData.length !== 0 ? (
              movieReviewsData.map((review) => {
                const formattedDate = new Date(
                  review.review_created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                let errorMsg = "";
                let bgColor = "";
                if (review.review_status === 1 && review.review_public === 0) {
                  // Not public
                  errorMsg = "Not public";
                  bgColor = "bg-gray-500";
                } else if (review.review_status === 0) {
                  // Pending
                  errorMsg = "Pending Review";
                  bgColor = "bg-movieMediumGreen";
                } else {
                  // Declined
                  errorMsg = "Declined";
                  bgColor = "bg-red-800";
                }

                return (
                  <article
                    className="relative px-4 py-8 border-b border-white"
                    key={review.review_id}
                  >
                    {review.review_status !== 1 ||
                    review.review_public === 0 ? (
                      <div
                        className={`absolute inset-0 flex items-center justify-center z-10 ${bgColor} bg-opacity-20`}
                      >
                        <p className="text-xl font-bold">{errorMsg}</p>
                      </div>
                    ) : null}
                    <h3 className="pb-4 text-lg font-bold">
                      {review.review_title}
                    </h3>
                    <MovieRating rating={review.review_rating} />
                    <p>{review.review_text}</p>
                    <p className="mt-4 italic">
                      Written by {review.user_username} on {formattedDate}
                    </p>
                  </article>
                );
              })
            ) : (
              <p className="pb-4 text-lg font-bold">
                No reviews available. Write one now to give your opinon.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieReviews;
