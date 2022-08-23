import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="w-full h-screen text-textColor">
      <div className="grid place-content-center items-center justify-center h-full">
        <p className="text-7xl text-center font-roboto font-black ">404</p>
        <h1 className="font-roboto text-8xl font-black text-gray-700 text-center">
          Link Not Found!
        </h1>
        <Link
          to="/"
          className="text-blue-400 underline mt-4 font-roboto text-h4"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default Error404;
