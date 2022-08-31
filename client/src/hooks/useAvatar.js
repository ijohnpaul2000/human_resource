import { useSelector } from "react-redux";

import super_user from "../assets/avatars/super_user.png";
import admin from "../assets/avatars/admin.png";
import staff from "../assets/avatars/staff.png";
import applicant from "../assets/avatars/applicant.png";

const useAvatar = () => {
  const curretUserLevel = useSelector((state) => state.auth.user.user_level);

  switch (curretUserLevel) {
    case "super_user":
      return super_user;
    case "admin":
      return admin;
    case "user":
      return staff;
    case "applicant":
      return applicant;

    default:
      return "default applicant";
  }
};

export default useAvatar;
