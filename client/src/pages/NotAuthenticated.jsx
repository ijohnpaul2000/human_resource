import React from "react";
import { Link } from "react-router-dom";

const NotAuthenticated = () => {
  return (
    <div className="h-screen px-4 font-poppins">
      <div className="h-full grid place-content-center">
        <h1 className="text-9xl font-extrabold text-red-400 text-center">!</h1>
        <p className="text-fsXL font-bold text-center leading-none">
          Not Authenticated
        </p>
        <p>Please Login and Try Again</p>
        <Link to="/" className="my-4 text-blue-400">
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotAuthenticated;
