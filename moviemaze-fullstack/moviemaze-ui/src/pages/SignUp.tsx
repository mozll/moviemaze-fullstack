import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  username: string;
  birthday: string;
  password: string;
  password2: string;
}

interface ErrorData {
  status: string;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    birthday: "",
    password: "",
    password2: "",
  });

  const [errorData, setErrorData] = useState<ErrorData>({
    status: "",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Perform client-side validation
      if (formData.password !== formData.password2) {
        throw new Error("Passwords do not match");
      }

      // Make the POST request to API
      fetch(`${API_BASE_URL}/users/add`, {
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
          // changed from .then((data) => { - to complete linting.

          window.location.href = "/signup-completed";
        })
        .catch((error) => {
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
          Create user
        </h1>
        <div className="h-full p-16 mb-16 text-white w-[600px] max-w-[80%] bg-movieDarkestDark">
          <p className="mb-4 text-lg italic text-center">{errorData.message}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="inline-block w-1/3 pr-4 text-lg text-right sm:w-1/4"
              >
                Name:
              </label>
              <input
                type="text"
                className="w-2/3 text-movieDarkestDark sm:w-3/4"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              ></input>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="inline-block w-1/3 pr-4 text-lg text-right sm:w-1/4"
              >
                Email:
              </label>
              <input
                type="email"
                className="w-2/3 sm:w-3/4 text-movieDarkestDark"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              ></input>
            </div>
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
                htmlFor="birthday"
                className="inline-block w-1/3 pr-4 text-lg text-right sm:w-1/4"
              >
                Birthday:
              </label>
              <input
                type="date"
                className="w-2/3 sm:w-3/4 text-movieDarkestDark"
                id="birthday"
                name="birthday"
                value={formData.birthday}
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
            <div className="mb-4">
              <label
                htmlFor="password2"
                className="inline-block w-1/3 pr-4 text-lg text-right sm:w-1/4"
              >
                Confirm:
              </label>
              <input
                type="password"
                className="w-2/3 sm:w-3/4 text-movieDarkestDark"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex justify-center mt-8 mb-12">
              <button
                type="submit"
                className="block px-10 py-2 font-semibold bg-movieLightGreen whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
            <div className="flex justify-center gap-4"></div>

            <div className="flex justify-center gap-4">
              <Link to="/login">Already member?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
