import { useEffect, useState } from "react";
import { Review } from "../components/MoviePage/MovieReviews";
import { Movie } from "../hooks/useMovies";
import {
  fetchPendingReviews,
  postApproveReview,
  postDeclineReview,
} from "../../apiService";
import { useNavigate } from "react-router-dom";
import MovieRating from "../components/MovieRating/MovieRating";

interface PendingReview {
  review: Review;
  movie: Movie;
}

const Admin = () => {
  const navigate = useNavigate();

  const [pendingReviewsData, setPendingReviewsData] = useState<
    PendingReview[] | null
  >(null);

  const [loadingPendingReviews, setLoadingPendingReviews] = useState(true);
  const [errorGetPendingReviews, setErrorGetPendingReviews] = useState("");

  useEffect(() => {
    fetchPendingReviews()
      .then((pendingReviews) => {
        setPendingReviewsData(pendingReviews);
        setLoadingPendingReviews(false);
      })
      .catch((err) => {
        if (err.response && err.response.data.error == "ACCESS_DENIED") {
          navigate("/", { replace: true });
        }
        setErrorGetPendingReviews(err.message);
        setLoadingPendingReviews(false);
      });
  }, []);

  if (loadingPendingReviews) {
    return <div>Loading reviews...</div>;
  }

  if (errorGetPendingReviews) {
    return <div>Error loading pending reviews: {errorGetPendingReviews}</div>;
  }

  if (!pendingReviewsData) {
    return <div>No reviews found.</div>;
  }

  function handleDecline(review_id: number): void {
    postDeclineReview(review_id)
      .then(() => {
        if (pendingReviewsData) {
          const updatedPendingReviews = pendingReviewsData.filter(
            (pendingReview) => pendingReview.review.review_id !== review_id
          );
          setPendingReviewsData(updatedPendingReviews);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.error == "ACCESS_DENIED") {
          navigate("/", { replace: true });
        }
      });
  }

  function handleApprove(review_id: number): void {
    postApproveReview(review_id)
      .then(() => {
        if (pendingReviewsData) {
          const updatedPendingReviews = pendingReviewsData.filter(
            (pendingReview) => pendingReview.review.review_id !== review_id
          );
          setPendingReviewsData(updatedPendingReviews);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.error == "ACCESS_DENIED") {
          navigate("/", { replace: true });
        }
      });
  }

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
      <div className="bg-[#1A1B27] text-white">
        <div className="px-8 py-8 w-full sm:w-[540px] md:w-[720px] lg:w-[960px] xl:w-[1140px] 2xl:w-[1400px] mx-auto">
          <h1 className="text-3xl font-bold ">Admin page</h1>
          <h2 className="mt-4 text-2xl font-bold">Reviews pending approval</h2>
          <div className="grid grid-cols-1 gap-6 mt-6 2xl:grid-cols-2">
            {pendingReviewsData &&
              pendingReviewsData.map((pendingReview, index) => {
                const formattedDate = new Date(
                  pendingReview.review.review_created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <div
                    key={index}
                    className="flex flex-row p-4 shadow-[5px_5px_15px_0_rgba(0,0,0,.5)]"
                  >
                    <div>
                      <img
                        src={`http://image.tmdb.org/t/p/w500/${pendingReview.movie.poster_path}`}
                        alt={pendingReview.movie.title}
                        className="hidden w-32 h-auto md:w-64 sm:block"
                      />
                    </div>
                    <div className="flex flex-col justify-between pl-4">
                      <div>
                        <h3 className="mb-2 text-xl font-bold">
                          {pendingReview.movie.title}
                        </h3>
                        <MovieRating
                          rating={pendingReview.review.review_rating}
                        />
                        <h4 className="text-lg font-semibold">
                          {pendingReview.review.review_title}
                        </h4>
                        <p>{pendingReview.review.review_text}</p>
                        <p className="my-4 italic">
                          Written by {pendingReview.review.user_username} on{" "}
                          {formattedDate}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            handleDecline(pendingReview.review.review_id)
                          }
                          className="block px-10 py-2 font-semibold bg-red-600 whitespace-nowrap"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() =>
                            handleApprove(pendingReview.review.review_id)
                          }
                          className="block px-10 py-2 font-semibold bg-movieLightGreen whitespace-nowrap"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
