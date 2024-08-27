import axios from "axios";

// Access the API key directly from process.env
const apiKey = import.meta.env.VITE_API_KEY;

// Create an axios instance with API key set as parameter
export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
  },
});
