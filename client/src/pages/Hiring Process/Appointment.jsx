import React, { useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { IS_MODAL_OPENED } from "../../redux/features/appoinmentReducer";
import { getApplicantsInfo } from "../../redux/features/appoinmentReducer";
import AddAppointment from "../../components/AddAppointment";

const Appointment = () => {
  const dispatch = useDispatch();
  const { isModalOpened, applicantInfo } = useSelector(
    (store) => store.appointment
  );

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

  const renderHeader = () => {
    return (
      <div className="flex align-items-center gap-4">
        <Button
          type="button"
          label="Add Appointment"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => dispatch(IS_MODAL_OPENED(true))}
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    );
  };

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

  return (
    <div>
      <div className="header">Applicant Screening</div>

      <DataTable value={data} responsiveLayout="scroll" header={renderHeader}>
        {columnComponent}
      </DataTable>
      <Dialog
        visible={isModalOpened}
        header="New Appointment"
        style={{ width: "700px" }}
        className="p-fluid"
        modal
        onHide={() => dispatch(IS_MODAL_OPENED(false))}
      >
        <AddAppointment />
      </Dialog>
    </div>
  );
};

export default Appointment;
