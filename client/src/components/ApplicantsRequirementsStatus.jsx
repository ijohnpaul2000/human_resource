import React from "react";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";

import { useSelector } from "react-redux";

const ApplicantsRequirementsStatus = () => {
  const requirements = useSelector(
    (state) => state.requirements.requirementInfo
  );

  const renderCompletionStatus = (rowData) => {
    if (rowData.completionStatus === 1) {
      console.log("row Name", rowData);
      return "Completed";
    }
  };

  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Full Name" rowSpan={1} colSpan={3} />
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
    <DataTable
      value={requirements}
      responsiveLayout="scroll"
      showGridlines
      size="small"
      headerColumnGroup={headerGroup}
    >
      <Column field="Applicant.firstname" header="First Name" />
      <Column field="Applicant.middlename" header="Middle Name" />
      <Column field="Applicant.lastname" header="Last Name" />
      <Column
        body={(rowData, item) => {
          if (Number(rowData.completionStatus) === 1) {
            return "Completed";
          } else {
            return "Not Completed";
          }
        }}
        header="Status"
      />
    </DataTable>
  );
};

export default ApplicantsRequirementsStatus;
