import React, { useEffect } from "react";
import DashboardCard from "../components/DashboardCard";

import { useDispatch, useSelector } from "react-redux";

import { getApplicantsData } from "../redux/features/Entities/ApplicantsThunk";
import { getAppointments } from "../redux/features/Entities/AppointmentsThunk";
import {
  getEmployeesData,
  GET_DEPLOYED_EMPLOYEES,
} from "../redux/features/Entities/EmployeesThunk";
import { getRegisteredNo } from "../redux/features/Entities/OnlineApplicantsThunk";
import ApplicantsScreening from "../components/ApplicantsScreening";
import DeployedEmployee from "../components/charts/DeployedEmployee";
import RegisterApplicant from "./RegisterApplicant";
import ListAppointment from "./Hiring Process/ListAppointment";
import { getContracts } from "../redux/features/contractReducer";

const Dashboard = () => {
  /* 
    DISPATCH - the handler of actions
    so we can call the different methods in different places in the application
  */
  const dispatch = useDispatch();
  const userLevel = useSelector((store) => store.auth.user?.user_level);

  /* 
    Declaration of the variable to get the number of Applicants
  */
  const applicantsCount = useSelector(
    (state) => state.applicants.applicantsData.length
  );

  /* 
    Declaration of the variable to get the number of appointments.
  */
  const appointmentsCount = useSelector(
    (state) => state.appointments.appointmentsData.length
  );

  /* 
    Declaration of the variable to get the number of Deployed Employee
  */
  const deployedEmployeesCount = useSelector(
    (state) => state.employees.deployedEmployeesData.length
  );

  /* 
    Declaration of the variable to get the number of Total employees
  */
  const employees = useSelector((state) => state.employees.employeesData);

  /* 
    It will rerendered the page if detects new data or updated data.
  */
  useEffect(() => {
    /* 
      We must filter the employees if that employee is already deployed, 
      this is used to only shows the Deployed Employees.
    */
    const deployedEmployees = employees.filter(
      (employee) => employee.isEmployeeDeployed === true
    );
    dispatch(GET_DEPLOYED_EMPLOYEES(deployedEmployees));
  }, [dispatch, employees]);

  /* 
    It will rerendered the page if detects new data or updated data.
  */
  useEffect(() => {
    dispatch(getApplicantsData());
    dispatch(getAppointments());
    dispatch(getEmployeesData());
    dispatch(getRegisteredNo());
    dispatch(getContracts());
  }, [dispatch]);

  /* 
    An array of HTML and CSS properties that will be passed in DashboardCard component
    to avoid redundant codes in HTML and CSS. 
  */
  const dashboardCardData = [
    {
      id: "applicantsNo",
      bgColor: "bg-[#005892]",
      accentColor: "bg-[#033c61]",
      count: applicantsCount,
      cardTitle: "Total Applicants",
    },
    {
      id: "appointmentsNo",
      bgColor: "bg-[#086E2D]",
      accentColor: "bg-[#006316]",
      count: appointmentsCount,
      cardTitle: "Appointments No.",
    },
    {
      id: "registeredOnline",
      bgColor: "bg-[#B87E01]",
      accentColor: "bg-[#AC7A01]",
      count: 0,
      cardTitle: "Total of Applicants Registered Online",
    },
    {
      id: "deployedEmployeeNo",
      bgColor: "bg-[#901412]",
      accentColor: "bg-[#640f15]",
      count: deployedEmployeesCount,
      cardTitle: "Total of Deployed Employee",
    },
  ];

  /* 
    It will render the no. of Applicants and Employees in the UI
  */
  return (
    <>
      {userLevel === "applicant" ? (
        <ListAppointment />
      ) : (
        <>
          <h1 className="mb-4 text-3xl font-semibold font-poppins">
            Dashboard
          </h1>
          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {dashboardCardData.map((card) => (
              <DashboardCard
                accentColor={card.accentColor}
                bgColor={card.bgColor}
                count={card.count}
                key={card.id}
                cardTitle={card.cardTitle}
              />
            ))}
          </div>
          <ApplicantsScreening />
          <DeployedEmployee />
        </>
      )}
    </>
  );
};

export default Dashboard;
