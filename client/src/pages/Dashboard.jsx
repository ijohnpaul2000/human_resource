import React from "react";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div>
      {Object.entries(currentUser).map(([key, value]) => {
        return (
          <div key={key}>
            {key} : {value}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
