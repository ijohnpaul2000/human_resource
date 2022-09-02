import React, { useEffect } from "react";
import DashboardCard from "../components/DashboardCard";

import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";

import { getApplicantsData } from "../redux/features/Entities/ApplicantsThunk";
import { getAppointments } from "../redux/features/Entities/AppointmentsThunk";
import {
  getEmployeesData,
  GET_DEPLOYED_EMPLOYEES,
} from "../redux/features/Entities/EmployeesThunk";
import { getRegisteredNo } from "../redux/features/Entities/OnlineApplicantsThunk";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";

const Dashboard = () => {
  const dispatch = useDispatch();

  const applicants = useSelector((state) => state.applicants.applicantsData);

  const applicantsCount = useSelector(
    (state) => state.applicants.applicantsData.length
  );

  const appointmentsCount = useSelector(
    (state) => state.appointments.appointmentsData.length
  );

  const deployedEmployeesCount = useSelector(
    (state) => state.employees.deployedEmployeesData.length
  );

  const employees = useSelector((state) => state.employees.employeesData);

  useEffect(() => {
    const deployedEmployees = employees.filter(
      (employee) => employee.isEmployeeDeployed === true
    );
    dispatch(GET_DEPLOYED_EMPLOYEES(deployedEmployees));
  }, []);

  useEffect(() => {
    dispatch(getApplicantsData());
    dispatch(getAppointments());
    dispatch(getEmployeesData());
    dispatch(getRegisteredNo());
  }, []);

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

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          header="Full Name"
          rowSpan={1}
          colSpan={3}
          style={{ textAlign: "center" }}
        />
        <Column header="Email" rowSpan={2} />
        <Column header="Status" rowSpan={2} />
      </Row>
      <Row>
        <Column header="First Name" colSpan={1} field="firstname" />
        <Column header="Middle Name" colSpan={1} field="middlename" />
        <Column header="Last Name" colSpan={1} field="lastname" />
      </Row>
    </ColumnGroup>
  );

  return (
    <>
      <h1 className="text-3xl font-poppins font-semibold mb-4">Dashboard</h1>
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

      <div className="my-10">
        <h1 className="my-5 font-poppins text-2xl font-semibold">
          Applicants for Screening
        </h1>
        <DataTable
          value={applicants}
          responsiveLayout="scroll"
          showGridlines
          size="small"
          headerColumnGroup={headerGroup}
        >
          <Column field="firstname" header="First Name" />
          <Column field="middlename" header="Middle Name" />
          <Column field="lastname" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="applicant_status" header="Status" />
        </DataTable>
      </div>
    </>
  );
};

export default Dashboard;
