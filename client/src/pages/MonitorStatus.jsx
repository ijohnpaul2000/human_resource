import React from "react";
import ApplicantsRequirementsStatus from "../components/ApplicantsRequirementsStatus";
import ApplicantsStatus from "../components/ApplicantsStatus";

const MonitorStatus = () => {
  return (
    <div className="">
      <div className="my-4">
        <h1 className="font-poppins text-2xl font-semibold">
          Applicants Status Monitoring
        </h1>
        <ApplicantsStatus />
      </div>

      <div className="pb-20">
        <h1 className="font-poppins text-2xl font-semibold">
          Applicants Requirements Status
        </h1>
        <ApplicantsRequirementsStatus />
      </div>
    </div>
  );
};

export default MonitorStatus;
