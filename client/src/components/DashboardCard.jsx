import React from "react";
import { Link } from "react-router-dom";

import { BsFillArrowRightCircleFill } from "react-icons/bs";

const DashboardCard = ({ bgColor, accentColor, count, cardTitle }) => {
  return (
    <div
      className={`${bgColor}  rounded-lg font-poppins text-white flex flex-col justify-between`}
    >
      <div className="p-4">
        <h1 className="font-extrabold text-5xl ">{count}</h1>
        <h2 className="font-normal text-lg ">{cardTitle}</h2>
      </div>
      <Link
        to="/reports"
        className={`w-full ${accentColor}  flex items-center p-4 rounded-b-lg`}
      >
        <p className="mr-2">More Info</p>
        <span>
          <BsFillArrowRightCircleFill />
        </span>
      </Link>
    </div>
  );
};

export default DashboardCard;
