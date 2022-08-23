import React, { useState } from "react";
import { useSelector } from "react-redux";
import NotAuthenticated from "./NotAuthenticated";
import { SideBarData } from "../components/SideBarData";
import { NavLink } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import {
  MdSpaceDashboard,
  MdAssignmentInd,
  MdSearch,
  MdKeyboardArrowDown,
  MdExitToApp,
  MdSegment,
  MdAccountBox,
  MdClear,
  MdHowToVote,
  MdAccountCircle,
} from "react-icons/md";
const SideNavBar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const userToken = sessionStorage.getItem("user_token");

  //User Information
  const information = [];

  //Side Bar State
  const [visible, setVisible] = useState(true);

  if (!currentUser || !userToken) {
    return <NotAuthenticated />;
  }

  Object.entries(currentUser).map(([key, value]) => {
    return information.push(value);
  });

  const dropDown = () => {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
  };

  // Side Bar Credits: https://www.youtube.com/watch?v=50ubtMhJkkg&ab_channel=CodeAProgram

  return (
    <div>
      <div
        className="absolute text-white text-4xl p-2 top-5 bg-gray-900 left-4 rounded-md cursor-pointer"
        onClick={() => setVisible(true)}
      >
        <i className="bg-gray-900 rounded-md">
          <MdSegment />
        </i>
      </div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        showCloseIcon="true"
      >
        <div
          className="sidebar fixed top-0 bottom-0 duration-1000
    p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow h-screen lg:left-0"
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center rounded-md ">
              <i className="px-2 py-1 rounded-md">
                <MdAccountBox />
              </i>
              <h1 className="text-[15px]  ml-3 text-xl text-gray-200 font-bold">
                Hello, {information[1].toUpperCase()}
              </h1>
              <i
                className="ml-20 cursor-pointer"
                onClick={() => setVisible(false)}
              >
                <MdClear />
              </i>
            </div>
            <hr className="my-2 text-gray-600" />

            <div>
              <div
                className="p-2.5 mt-3 flex items-center rounded-md 
        px-4 duration-300 cursor-pointer bg-gray-700"
              >
                <i className="">
                  <MdSearch />
                </i>
                <input
                  className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                  placeholder="Search"
                />
              </div>

              <NavLink to={"/"} onClick={() => setVisible(false)}>
                <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                  <i>
                    <MdSpaceDashboard />
                  </i>
                  <span className="text-[15px] font-bold ml-4 text-gray-200">
                    Home
                  </span>
                </div>
              </NavLink>
              <hr className="my-4 text-gray-600" />

              <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                <i className="">
                  <MdAssignmentInd />
                </i>
                <div
                  className="flex justify-between w-full items-center"
                  onClick={dropDown}
                >
                  <span className="text-[15px] font-bold ml-4 text-gray-200">
                    Hiring Process Menu
                  </span>
                  <span className="text-sm rotate-180" id="arrow">
                    <i className="">
                      <MdKeyboardArrowDown />
                    </i>
                  </span>
                </div>
              </div>
              <div
                className=" leading-7 text-left text-sm font-thin mt-2 w-4/5 mx-auto"
                id="submenu"
              >
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Applicant Screening
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Applicant Requirements
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Applicant Appointment
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Applicant Status
                </h1>
                <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                  Examination
                </h1>
              </div>
              <NavLink to={"/users"} onClick={() => setVisible(false)}>
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
                  <i className="">
                    <MdAccountCircle />
                  </i>
                  <span className="text-[15px] font-bold ml-4 text-gray-200">
                    Manage Users
                  </span>
                </div>
              </NavLink>
              {/* <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
              <i className="">
                <MdHowToVote />
              </i>
              <span className="text-[15px] font-bold ml-4 text-gray-200">
                Reports
              </span>
            </div>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600">
              <i className="">
                <MdExitToApp />
              </i>
              <span className="text-[15px] font-bold ml-4 text-gray-200">
                Logout
              </span>
            </div> */}
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideNavBar;
