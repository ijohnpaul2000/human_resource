import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/features/sidebarReducer";

const SharedLayout = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <>
      <Sidebar />
      <div
        className={`relative flex  ${
          isSidebarOpen
            ? " left-[250px] h-screen  w-[calc(100%-250px)]"
            : "w-full"
        }`}
      >
        <FaBars onClick={() => dispatch(toggleSidebar())} />
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
