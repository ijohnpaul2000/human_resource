import React, { useEffect } from "react";
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
  RESET_STATE as RESET_SIDEBAR_STATE,
} from "../redux/features/sidebarReducer";

import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/features/authReducer";
import { SET_MODAL } from "../redux/features/modalReducer";
import { renderDialog } from "../helpers/renderDialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import useAvatar from "../hooks/useAvatar";
import { SET_SELECTED_APPOINTMENT } from "../redux/features/appoinmentReducer";
import { SET_SELECTED_REQUIREMENT } from "../redux/features/requirementReducer";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avatar = useAvatar();

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const isSubMenuOpen = useSelector((state) => state.sidebar.isSubMenuOpen);
  const linkActive = useSelector((state) => state.sidebar.linkActive);

  const currentUser = useSelector((state) => state.auth.user.username);
  const curretUserLevel = useSelector((state) => state.auth.user.user_level);

  const handleLogout = () => {
    navigate("/");
    dispatch(LOGOUT());
  };

  useEffect(() => {
    dispatch(SET_SELECTED_APPOINTMENT(""));
    dispatch(SET_SELECTED_REQUIREMENT(""));
  }, [isSidebarOpen, linkActive]);

  return (
    /*
      THE FOLLOWING LINE OF CODES (COMMENTED) ARE FUNCTIONING AND UPDATED
    */
    // <header
    //   className={`bg-[#E8F0FE] max-w-[250px] h-screen fixed top-0 left-0 z-10 duration-300 ${
    //     isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
    //   }`}
    // >
    //   <div className="flex flex-col items-center mt-5">
    //     <MdOutlineSecurity
    //       size={35}
    //       onClick={() => {
    //         dispatch(TOGGLE_SIDEBAR());
    //       }}
    //     />

    //     <h1 className="text-center font-bold text-xl m-2">
    //       Orion Task Force Security Agency Co.,
    //     </h1>
    //   </div>

    //   {/*  ACCOUNT INFO */}
    //   <div className="p-4 font-medium flex  border-t-2 border-gray-400">
    //     <img src={avatar} alt="" className="max-w-[50px]" />
    //     <div className="pl-4">
    //       <p className="">{currentUser}</p>
    //       <p className="">{curretUserLevel}</p>
    //     </div>
    //   </div>

    //   <nav className="">
    //     <ul>
    //       <Link
    //         to="/dashboard"
    //         onClick={() => dispatch(SET_LINK_ACTIVE("Dashboard"))}
    //       >
    //         <li
    //           className={`${
    //             linkActive === "Dashboard" && "bg-gray-700 text-white"
    //           }`}
    //         >
    //           <AiOutlineHome /> Dashboard
    //         </li>
    //       </Link>
    //       <div className={`${curretUserLevel === "applicant" ? "hidden" : ""}`}>
    //         <li onClick={() => dispatch(TOGGLE_SUBMENU())}>
    //           <AiOutlineDatabase />
    //           Hiring Process Menu{" "}
    //           <HiOutlineChevronRight
    //             className={`ml-4 ${isSubMenuOpen ? "rotate-90 " : ""}`}
    //           />
    //         </li>

    //         {/* MAPPING LINKS FOR HIRING PROCESS */}

    //         <div className={`${isSubMenuOpen ? "" : "hidden"}`}>
    //           {sidebarData.map((item) => (
    //             <Link
    //               key={item.path}
    //               to={item.path}
    //               onClick={() => {
    //                 dispatch(SET_LINK_ACTIVE(item.title));
    //               }}
    //             >
    //               <li
    //                 className={`${
    //                   linkActive === item.title && "bg-gray-700 text-white"
    //                 } `}
    //               >
    //                 {item.title}
    //               </li>
    //             </Link>
    //           ))}
    //         </div>
    //       </div>

    //       <div className={`${curretUserLevel === "applicant" ? "hidden" : ""}`}>
    //         <Link
    //           to="/monitor-status"
    //           onClick={() => dispatch(SET_LINK_ACTIVE("Monitor Status"))}
    //         >
    //           <li
    //             className={`${
    //               linkActive === "Monitor Status" && "bg-gray-700 text-white"
    //             } `}
    //           >
    //             <IoStatsChartSharp /> Monitor Status
    //           </li>
    //         </Link>
    //       </div>

    //       {/* //TODO: ADD DIALOG FOR PREFERENCES NO NEED TO SET LINK ACTIVE BECAUSE IT'S A DIALOG*/}
    //       <li>
    //         <IoSettingsOutline />
    //         Preferences
    //       </li>
    //       <li
    //         onClick={() =>
    //           renderDialog(
    //             "Do you want to log out?",
    //             "Logout Confirmation",
    //             "pi pi-info-circle",
    //             "DANGER",
    //             handleLogout,
    //             dispatch(SET_MODAL({ isOpen: false }))
    //           )
    //         }
    //       >
    //         <IoLogOutOutline />
    //         Sign Out
    //       </li>
    //     </ul>
    //   </nav>
    //   <ConfirmDialog />
    // </header>

    // WILL BE PRESENTED TO THE PANEL
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

      {/*  ACCOUNT INFO */}
      <div className="p-4 font-medium flex  border-t-2 border-gray-400">
        <img src={avatar} alt="" className="max-w-[50px]" />
        <div className="pl-4">
          <p className="">{currentUser}</p>
          <p className="">{curretUserLevel}</p>
        </div>
      </div>

      {/* SET TO /dashboard to hide the functionality */}
      <nav className="">
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
          <div className={`${curretUserLevel === "applicant" ? "hidden" : ""}`}>
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
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    dispatch(SET_LINK_ACTIVE(item.title));
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

          <div className={`${curretUserLevel === "applicant" ? "hidden" : ""}`}>
            <Link
              to="/dashboard"
              onClick={() => dispatch(SET_LINK_ACTIVE("Monitor Status"))}
            >
              <li
                className={`${
                  linkActive === "Monitor Status" && "bg-gray-700 text-white"
                } `}
              >
                <IoStatsChartSharp /> Monitor Status
              </li>
            </Link>
          </div>

          {/* //TODO: ADD DIALOG FOR PREFERENCES NO NEED TO SET LINK ACTIVE BECAUSE IT'S A DIALOG*/}
          <li>
            <IoSettingsOutline />
            Preferences
          </li>
          <li
            onClick={() =>
              renderDialog(
                "Do you want to log out?",
                "Logout Confirmation",
                "pi pi-info-circle",
                "DANGER",
                handleLogout,
                dispatch(SET_MODAL({ isOpen: false }))
              )
            }
          >
            <IoLogOutOutline />
            Sign Out
          </li>
        </ul>
      </nav>
      <ConfirmDialog />
    </header>
  );
};

export default Sidebar;
