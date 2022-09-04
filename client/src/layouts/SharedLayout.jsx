import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SIDEBAR } from "../redux/features/sidebarReducer";
import NotAuthenticated from "../pages/NotAuthenticated";
import Footer from "../components/Footer";
import RegisterApplicant from "../pages/RegisterApplicant";

const SharedLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLevel = useSelector((store) => store.auth.user?.user_level);
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  if (userLevel === "applicant" || !userLevel) {
    return <RegisterApplicant />;
  }

  return (
    <>
      <Sidebar />
      <div
        className={`relative block p-4   ${
          isSidebarOpen
            ? " left-[250px] h-screen  w-[calc(100%-250px)] "
            : "w-full "
        }`}
      >
        <FaBars
          onClick={() => dispatch(TOGGLE_SIDEBAR())}
          className="mb-5"
          size={20}
        />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default SharedLayout;
