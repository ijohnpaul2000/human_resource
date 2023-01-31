import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { useSelector } from "react-redux";
import { useEffect } from "react";

/*
 * * APPLICANT SCREENING WILL CHECK
 * * THE APPLICANTS STATUS (INTERVIEW, CONTRACT SIGNAGE, DEPLOYMENT)
 */
const ApplicantsScreening = () => {
  /* 
    It will retrived the updated data of the applicants.
  */
  const applicants = useSelector((state) => state.applicants.applicantsData);

  /* 
    Renders the columns of the table.
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
    It will rendered the table of the Applicants including their status.
  */

  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    const filteredApplicants = applicants?.filter((applicant) => {
      return applicant.application_status.toLowerCase() === "screening";
    });

    console.log({ applicants, filteredApplicants });
    setFilteredApplicants(filteredApplicants);
  }, [applicants]);
  return (
    <>
      <h1 className="my-5 text-2xl font-semibold font-poppins">
        Applicants for Screening
      </h1>
      <DataTable
        value={filteredApplicants}
        responsiveLayout="scroll"
        showGridlines
        size="small"
        rows={10}
        paginator
        headerColumnGroup={headerGroup}
      >
        <Column field="firstname" header="First Name" />
        <Column field="middlename" header="Middle Name" />
        <Column field="lastname" header="Last Name" />
        <Column field="email" header="Email" />
        <Column field="applicant_status" header="Status" />
      </DataTable>
    </>
  );
};

export default ApplicantsScreening;
