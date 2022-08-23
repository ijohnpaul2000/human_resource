import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../pages/SideNavBar";

const SharedLayout = () => {
  return (
    <>
      <SideNavBar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
