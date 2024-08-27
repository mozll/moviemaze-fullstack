import { Link } from "react-router-dom";

const SignUpCompleted = () => {
  return (
    <>
      <div className="min-h-[50vh] text-white bg-movieLightDark">
        <h1 className="p-16 text-xl text-center">
          User successfully registered
        </h1>
        <div className="p-12 text-center">
          <Link
            to="/login"
            className="px-10 py-2 font-semibold bg-movieLightGreen whitespace-nowrap"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpCompleted;
