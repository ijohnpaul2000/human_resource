import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Appointment = () => {
  const data = [
    {
      applicant_id: "b6f79a17-9056-4b05-9086-b32366de9939",
      appointment_date: "2023-01-23",
      appointment_time: "05:23:00",
      appointment_location: "Dyan lang",
      appointment_description: "basta",
      appointment_type: "1st Interview",
    },
  ];

  const columns = [
    { field: "applicant_id", header: "Applicant ID" },
    { field: "appointment_date", header: "Appointment Date" },
    { field: "appointment_time", header: "Appointment Time" },
    { field: "appointment_location", header: "Appointment Location" },
    { field: "appointment_description", header: "Appointment Description" },
    { field: "appointment_type", header: "Appointment Type" },
  ];

  const columnComponent = columns.map((item) => (
    <Column
      key={item.field}
      field={item.field}
      header={item.header}
      headerStyle={{
        justifyContent: "center",
        padding: "1rem 2rem",
        wordBreak: "normal",
        color: "#000",
      }}
      sortable
      filter
    />
  ));

  // const columns = () => {
  //   return (
  //     <>
  //       <Column
  //         field="applicant_id"
  //         header="Applicant"
  //         headerStyle={{
  //           justifyContent: "center",
  //           padding: "1rem 2rem",
  //           wordBreak: "normal",
  //           color: "#000",
  //         }}
  //         sortable
  //         filter
  //       />
  //       <Column
  //         field="appointment_date"
  //         header="Appointment Date"
  //         headerStyle={{
  //           justifyContent: "center",
  //           padding: "1rem 2rem",
  //           wordBreak: "normal",
  //         }}
  //         sortable
  //         filter
  //       />
  //       <Column
  //         field="appointment_time"
  //         header="Appointment Time"
  //         headerStyle={{
  //           justifyContent: "center",
  //           padding: "1rem 2rem",
  //           wordBreak: "normal",
  //         }}
  //         sortable
  //         filter
  //       />
  //       <Column
  //         field="appointment_location"
  //         header="Appointment Location"
  //         headerStyle={{
  //           justifyContent: "center",
  //           padding: "1rem 2rem",
  //           wordBreak: "normal",
  //         }}
  //         sortable
  //         filter
  //       />
  //       <Column
  //         field="appointment_description"
  //         header="Appointment Description"
  //         headerStyle={{
  //           justifyContent: "center",
  //           padding: "1rem 2rem",
  //           wordBreak: "normal",
  //         }}
  //         sortable
  //         filter
  //       />
  //       <Column
  //         field="appointment_type"
  //         header="Appointment Type"
  //         headerStyle={{
  //           justifyContent: "center",
  //           padding: "1rem 2rem",
  //           wordBreak: "normal",
  //         }}
  //         sortable
  //         filter
  //       />
  //     </>
  //   );
  // };
  return (
    <div>
      <DataTable value={data} responsiveLayout="scroll">
        {columnComponent}
      </DataTable>
    </div>
  );
};

export default Appointment;
