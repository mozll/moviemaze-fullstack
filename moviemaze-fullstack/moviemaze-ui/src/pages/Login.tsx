import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

interface ErrorData {
  status: string;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [errorData, setErrorData] = useState<ErrorData>({
    status: "",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Make the POST request to your API
      fetch(`${API_BASE_URL}/users/login`, {
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
          return response.json(); // This returns a promise
        })
        .then(() => {
          window.location.href = "/";
        })
        .catch((error) => {
          // Handle errors here
          setErrorData((prevData) => ({
            ...prevData,
            status: "error",
            message: error.message,
          }));
        });
    } catch (error: any) {
      // Handle validation or API request error
      if (error instanceof Error) {
        setErrorData((prevData) => ({
          ...prevData,
          status: "error",
          message: error.message,
        }));
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="flex flex-col items-center bg-movieLightDark">
        <h1 className="p-4 mt-8 mb-4 text-4xl font-semibold text-center text-white">
          Login
        </h1>
        <div className="h-full p-16 mb-16 text-white w-[600px] max-w-[80%] bg-movieDarkestDark">
          <p className="mb-4 text-lg italic text-center">{errorData.message}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="inline-block w-1/3 pr-4 text-lg text-right sm:w-1/4"
              >
                Username:
              </label>
              <input
                type="text"
                className="w-2/3 sm:w-3/4 text-movieDarkestDark"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="inline-block w-1/3 pr-4 text-lg text-right sm:w-1/4"
              >
                Password:
              </label>
              <input
                type="password"
                className="w-2/3 sm:w-3/4 text-movieDarkestDark"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex justify-center mt-8 mb-12">
              <button
                type="submit"
                className="block px-10 py-2 font-semibold bg-movieLightGreen whitespace-nowrap"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center gap-4">
              <Link to="/forgot">Forgot password?</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
