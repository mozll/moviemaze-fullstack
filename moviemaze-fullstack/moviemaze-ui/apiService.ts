// apiService.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"; //"http://143.42.61.153:8080/api"; //"http://api:3000/api";

export const fetchUserProfile = async (userId: number) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const postProfilePicture = async (
  userId: number,
  formData: FormData
) => {
  const response = await axios.post(
    `${API_BASE_URL}/profile-picture/${userId}`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const postResetProfilePicture = async (userId: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/profile-picture/reset/${userId}`,
    {}, // No request data, so pass null or an empty object
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const fetchPendingReviews = async () => {
  const response = await axios.get(`${API_BASE_URL}/reviews/pending`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const postDeclineReview = async (reviewId: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/reviews/decline/${reviewId}`,
    {}, // No request data, so pass null or an empty object
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const postApproveReview = async (reviewId: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/reviews/approve/${reviewId}`,
    {}, // No request data, so pass null or an empty object
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const fetchMovieReviews = async (movieId: number) => {
  const response = await axios.get(`${API_BASE_URL}/reviews/movie/${movieId}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
