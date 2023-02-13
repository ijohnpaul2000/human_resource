import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";

import { useDispatch, useSelector } from "react-redux";
import { getApplicantsData } from "../redux/features/Entities/ApplicantsThunk";
import { getEmployeesData } from "../redux/features/Entities/EmployeesThunk";
const ApplicantsStatus = () => {
  /* 
    Simple declaring of variable to retrieve all the applicants data.
  */
  const applicants = useSelector((state) => state.applicants.applicantsData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getApplicantsData());
    dispatch(getEmployeesData());
  }, [dispatch]);

  /* 
    For dynamic rendering of the headers for the UI.

    DYNAMIC - reusability of code that can be done by using LOOPS.
            - it will avoid hard coding of unneccesary data.
  */
  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Full Name" rowSpan={1} colSpan={3} />
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

  /* 
    It will rendered the table in the browser.
    HTML of the code in short.
  */
  return (
    <DataTable
      value={applicants}
      responsiveLayout="scroll"
      showGridlines
      size="small"
      headerColumnGroup={headerGroup}
      rows={10}
      first={0}
    >
      <Column field="firstname" header="First Name" />
      <Column field="middlename" header="Middle Name" />
      <Column field="lastname" header="Last Name" />
      <Column field="email" header="Email" />
      <Column field="application_status" header="Status" />
    </DataTable>
  );
};

export default ApplicantsStatus;
