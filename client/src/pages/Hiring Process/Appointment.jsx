import React, { useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { renderDialog } from "../../helpers/renderDialog";
import { notifyToast } from "../../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  getAppoinmentsInfo,
  IS_MODAL_OPENED,
  getApplicantsInfo,
  SET_SELECTED_APPOINTMENT,
} from "../../redux/features/appoinmentReducer";
import AddAppointment from "../../components/AddAppointment";
import { SET_MODAL } from "../../redux/features/modalReducer";
import { getAppointments } from "../../redux/features/Entities/AppointmentsThunk";

const Appointment = () => {
  const dispatch = useDispatch();
  const { isModalOpened, appointmentInfo, applicantInfo, selectedAppointment } =
    useSelector((store) => store.appointment);

  const { appointmentsData } = useSelector((store) => store.appointments);

  const columns = [
    { field: "Applicant", header: "Applicant" },
    { field: "appointment_date", header: "Appointment Date" },
    { field: "appointment_time", header: "Appointment Time" },
    { field: "appointment_location", header: "Appointment Location" },
    { field: "appointment_description", header: "Appointment Description" },
    { field: "appointment_type", header: "Appointment Type" },
  ];

  const renderName = (rowData, item) => {
    if (item.field === "Applicant") {
      return (
        rowData["Applicant"].firstname + " " + rowData["Applicant"].lastname
      );
    } else {
      return rowData[item.field];
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex gap-4 align-items-center">
        <Button
          type="button"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => {
            dispatch(IS_MODAL_OPENED(true));
            dispatch(SET_SELECTED_APPOINTMENT(""));
          }}
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-primary"
          onClick={() => dispatch(IS_MODAL_OPENED(true))}
          disabled={!selectedAppointment}
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => {
            renderDialog(
              "Do you want to delete this?",
              "Delete Data",
              "pi pi-exclamation-triangle",
              "DANGER",
              deleteAppointment,
              dispatch(SET_MODAL({ isOpen: false }))
            );
            dispatch(getAppointments());
          }}
          disabled={!selectedAppointment}
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    );
  };

  const deleteAppointment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/appointments/${selectedAppointment.id}`
      );
      console.log(response);
      dispatch(SET_SELECTED_APPOINTMENT(""));
      notifyToast("Data Deleted", "success");
    } catch (error) {
      notifyToast(error.response.data.message, "error");
    }
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
      body={renderName}
      sortable
      filter
    />
  ));

  useEffect(() => {
    dispatch(getAppoinmentsInfo());
  }, [dispatch]);

  console.log({ appointmentsData });
  return (
    <div>
      <div className="header">Applicant Appointment</div>

      <DataTable
        size="small"
        value={appointmentsData}
        responsiveLayout="scroll"
        showGridlines
        header={renderHeader}
        selection={selectedAppointment}
        selectionMode="radiobutton"
        onSelectionChange={(e) => {
          dispatch(SET_SELECTED_APPOINTMENT(e.value));
        }}
      >
        <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
        {columnComponent}
      </DataTable>
      <Dialog
        visible={isModalOpened}
        resizable={true}
        header={selectedAppointment ? "Update Appointment" : "New Appointment"}
        style={{ width: "700px" }}
        className="p-fluid"
        modal
        onHide={() => dispatch(IS_MODAL_OPENED(false))}
      >
        <AddAppointment />
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Appointment;
