import React from "react";
import { sidebarData } from "../data/sidebarData";

import { AiOutlineDatabase, AiOutlineHome } from "react-icons/ai";
import { IoStatsChartSharp, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineSecurity } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  TOGGLE_SIDEBAR,
  TOGGLE_SUBMENU,
  SET_LINK_ACTIVE,
} from "../redux/features/sidebarReducer";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const isSubMenuOpen = useSelector((state) => state.sidebar.isSubMenuOpen);
  const linkActive = useSelector((state) => state.sidebar.linkActive);

  console.log(sidebarData);

  return (
    <header
      className={`bg-[#E8F0FE] max-w-[250px] h-screen fixed top-0 left-0 z-10 duration-300 ${
        isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center mt-5">
        <MdOutlineSecurity
          size={35}
          onClick={() => {
            dispatch(TOGGLE_SIDEBAR());
          }}
        />

        <h1 className="text-center font-bold text-xl m-2">
          Orion Task Force Security Agency Co.,
        </h1>
      </div>
      <nav>
        <ul>
          <Link
            to="/dashboard"
            onClick={() => dispatch(SET_LINK_ACTIVE("Dashboard"))}
          >
            <li
              className={`${
                linkActive === "Dashboard" && "bg-gray-700 text-white"
              }`}
            >
              <AiOutlineHome /> Dashboard
            </li>
          </Link>
          <div className="">
            <li onClick={() => dispatch(TOGGLE_SUBMENU())}>
              <AiOutlineDatabase />
              Hiring Process Menu{" "}
              <HiOutlineChevronRight
                className={`ml-4 ${isSubMenuOpen ? "rotate-90 " : ""}`}
              />
            </li>

            {/* MAPPING LINKS FOR HIRING PROCESS */}

            <div className={`${isSubMenuOpen ? "" : "hidden"}`}>
              {sidebarData.map((item) => (
                <Link
                  to={item.path}
                  onClick={() => {
                    dispatch(SET_LINK_ACTIVE(item.title));
                    console.log(item.title);
                  }}
                >
                  <li
                    className={`${
                      linkActive === item.title && "bg-gray-700 text-white"
                    } `}
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/reports"
            onClick={() => dispatch(SET_LINK_ACTIVE("Reports"))}
          >
            <li
              className={`${
                linkActive === "Reports" && "bg-gray-700 text-white"
              } `}
            >
              <IoStatsChartSharp /> Reports
            </li>
          </Link>

          {/* //TODO: ADD DIALOG FOR PREFERENCES NO NEED TO SET LINK ACTIVE BECAUSE IT'S A DIALOG*/}
          <li>
            <IoSettingsOutline />
            Preferences
          </li>
          <li>
            <IoLogOutOutline />
            Sign Out
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Sidebar;
