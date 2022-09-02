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

const Appointment = () => {
  const dispatch = useDispatch();
  const { isModalOpened, appointmentInfo, applicantInfo, selectedAppointment } =
    useSelector((store) => store.appointment);
  let extractedData = [];

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
      sortable
      filter
    />
  ));

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await dispatch(getAppoinmentsInfo()).unwrap();
        console.log(fetchedData);
        console.log(appointmentInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [isModalOpened, selectedAppointment]);

  return (
    <div>
      <div className="header">Applicant Appointment</div>

      <DataTable
        value={appointmentInfo}
        responsiveLayout="scroll"
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
