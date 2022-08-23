import React from "react";
import { useSelector } from "react-redux";
import NotAuthenticated from "./NotAuthenticated";
const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const userToken = sessionStorage.getItem("user_token");

  if (!currentUser || !userToken) {
    return <NotAuthenticated />;
  }

  return (
    <div>
      {Object.entries(currentUser).map(([key, value]) => {
        return (
          <div key={key}>
            {key} :{" "}
            {value === "date_added" ? value.toLocaleDateString("en-PH") : value}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
