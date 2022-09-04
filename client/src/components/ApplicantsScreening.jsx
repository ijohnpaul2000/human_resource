import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { useSelector } from "react-redux";

const ApplicantsScreening = () => {
  const applicants = useSelector((state) => state.applicants.applicantsData);

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

  return (
    <>
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
    </>
  );
};

export default ApplicantsScreening;
