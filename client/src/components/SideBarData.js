import React from "react";
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

export const SideBarData = [
  {
    title: "Manage Users",
    path: "/users",
    icon: <MdAccountCircle />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <MdExitToApp />,
  },
];
