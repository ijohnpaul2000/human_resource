import React from "react";
import { AiOutlineDatabase, AiOutlineHome } from "react-icons/ai";
import { IoStatsChartSharp, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineSecurity } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, toggleSubMenu } from "../redux/features/sidebarReducer";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const isSubMenuOpen = useSelector((state) => state.sidebar.isSubMenuOpen);

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
            dispatch(toggleSidebar());
          }}
        />

        <h1 className="text-center font-bold text-xl m-2">
          Orion Task Force Security Agency Co.,
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <AiOutlineHome /> Dashboard
          </li>
          <div className="">
            <li onClick={() => dispatch(toggleSubMenu())}>
              <AiOutlineDatabase />
              Hiring Process Menu{" "}
              <HiOutlineChevronRight
                className={`ml-4 ${isSubMenuOpen ? "rotate-90 " : ""}`}
              />
            </li>
            <div className={`${isSubMenuOpen ? "" : "hidden"}`}>
              <li>
                <span>Applicant Screening</span>
              </li>
              <li>
                <span>Applicant Requirements</span>
              </li>
              <li>
                <span>Applicant Appointment</span>
              </li>
              <li>
                <span>Applicant Status</span>
              </li>
              <li>
                <span>Applicant Examination</span>
              </li>
            </div>
          </div>
          <li>
            <IoStatsChartSharp /> Reports
          </li>
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
