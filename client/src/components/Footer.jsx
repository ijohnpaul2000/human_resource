import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const date = new Date().getFullYear();
  const dateNextYear = new Date().getFullYear() + 1;

  return (
    <div className="bg-white border-t-2 border-gray-100 font-poppins text-base  text-center py-4 fixed bottom-0 right-0 left-0">
      <p>
        Copyright &copy; {date} - {dateNextYear}.{" "}
        <span className="inline-block font-bold mx-1 text-blue-500">
          Human Resource Management
        </span>
        . All rights reserved.{" "}
      </p>
    </div>
  );
};

export default Footer;
