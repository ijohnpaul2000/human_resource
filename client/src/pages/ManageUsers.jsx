import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const ManageUsers = () => {

  // Columns for the table
  const columns = [
    { field: "firstname", header: "First Name" },
    { field: "middlename", header: "Middle Name" },
    { field: "lastname", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "username", header: "Username" },
    { field: "user_level", header: "User Level" },
    { field: "date_added", header: "Date Added" },
  ];


  // Button Group on the top of table
  const renderHeader = () => {
    return (
      <div className="flex align-items-center gap-4">
        <Button
          type="button"
          icon="pi pi-plus"
          className="p-button-success"
          // onClick={() => {
          //   dispatch(IS_MODAL_OPENED(true));
          //   dispatch(SET_SELECTED_APPOINTMENT("")); //TODO: to be implemented
          // }}
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-primary"
          // onClick={() => dispatch(IS_MODAL_OPENED(true))}
          // disabled={!selectedAppointment} //TODO: to be implemented
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => {
            // renderDialog(
            //   "Do you want to delete this?",
            //   "Delete Data",
            //   "pi pi-exclamation-triangle",
            //   "DANGER",
            //   deleteAppointment,
            //   dispatch(SET_MODAL({ isOpen: false })) //TODO: to be implemented
            // );
            // dispatch(getAppointments());
          }}
          // disabled={!selectedAppointment}
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    );
  };

  // Loop the Columns on the Table
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

  // Actual UI Renderer
  return (
  <div>
    <div className="header">Manage Users</div>
    <DataTable
        size="small"
        value={0}
        responsiveLayout="scroll"
        showGridlines
        header={renderHeader}
        // selection={selectedAppointment}
        selectionMode="radiobutton"
        // onSelectionChange={(e) => {
        //   dispatch(SET_SELECTED_APPOINTMENT(e.value));
        // }}
      >
        <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
        {columnComponent}
      </DataTable>
  </div>
  );
};

export default ManageUsers;
