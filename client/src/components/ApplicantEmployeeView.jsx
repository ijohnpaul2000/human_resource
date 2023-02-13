import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { getApplicantsEmployeeInfo } from "../redux/features/applicantEmployeeReducer";
import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";
import { Chip } from "primereact/chip";

import { useSelector, useDispatch } from "react-redux";

const ApplicantEmployeeView = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const employeeInfo = useSelector(
    (state) => state.applicantEmployee.employeeInfo
  );

  console.log({ employeeInfo });
  let statusLevel = [];

  /* 
      It will rendered the header of the table.
    */
  let headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Full Name" rowSpan={1} colSpan={3} />
        <Column
          sortable
          filter
          header="Status"
          rowSpan={2}
          field={tab === 0 ? "employee_status" : "applicant_status"}
        />
        {tab === 0 && (
          <Column
            sortable
            filter
            header="Deployment Location"
            rowSpan={2}
            field="deployment_location"
          />
        )}
      </Row>
      <Row>
        <Column
          sortable
          filter
          header="First Name"
          colSpan={1}
          field="firstname"
        />
        <Column
          sortable
          filter
          header="Middle Name"
          colSpan={1}
          field="middlename"
        />
        <Column
          sortable
          filter
          header="Last Name"
          colSpan={1}
          field="lastname"
        />
      </Row>
    </ColumnGroup>
  );

  // TODO: To be implemented
  // For Status UI
  const statusBodyTemplate = (rowData) => {
    return <Chip label={rowData.user_level} />;
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statusLevel}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a User Level"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <span className={`requirement-badge status-complete`}>{option}</span>
    );
  };

  useEffect(() => {
    dispatch(getApplicantsEmployeeInfo());
  }, []);

  return (
    <TabView
      activeIndex={tab}
      onTabChange={(e) => {
        setTab(e.index);
      }}
    >
      <TabPanel header="Employees" rightIcon="pi pi-id-card ml-2">
        <DataTable
          value={employeeInfo?.data?.employees}
          responsiveLayout="scroll"
          showGridlines
          size="small"
          filterDisplay="menu"
          headerColumnGroup={headerGroup}
        >
          <Column field="firstname" header="First Name" />
          <Column field="middlename" header="Middle Name" />
          <Column field="lastname" header="Last Name" />
          <Column field="employee_status" header="Status" />
          <Column field="deployment_location" header="Deployment Location" />
        </DataTable>
      </TabPanel>
      <TabPanel header="Applicants" rightIcon="pi pi-user ml-2">
        <DataTable
          value={employeeInfo?.data?.applicants}
          responsiveLayout="scroll"
          showGridlines
          size="small"
          filterDisplay="menu"
          headerColumnGroup={headerGroup}
        >
          <Column field="firstname" header="First Name" />
          <Column field="middlename" header="Middle Name" />
          <Column field="lastname" header="Last Name" />
          <Column field="applicant_status" header="Status" />
        </DataTable>
      </TabPanel>
    </TabView>
  );
};

export default ApplicantEmployeeView;
