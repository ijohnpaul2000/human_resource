import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import { renderDialog } from "../../helpers/renderDialog";
import { notifyToast } from "../../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import {
  getAppointmentsInfo,
  SET_MODAL_STATE,
  SET_SELECTED_APPLICANT,
} from "../../redux/features/contractReducer";
import ViewContractSigning from "../../components/ViewContractSigning";

const Contract = () => {
  const dispatch = useDispatch();
  const {
    isOpened,
    appointmentInfo,
    applicantsInfo,
    selectedApplicant,
    selectedAppointment,
  } = useSelector((store) => store.contract);

  const columns = [
    { field: "Applicant", header: "Applicant" },
    { field: "appointment_type", header: "Appointment Type" },
  ];

  const signedColumns = [
    { field: "Applicant", header: "Applicant" },
    { field: "salary", header: "Salary" },
    { field: "contactDate", header: "Contact Date" },
    { field: "signature", header: "Signature" },
  ]

  const renderName = (rowData, item) => {
    if (item.field === "Applicant") {
      return (
        rowData["Applicant"].firstname + " " + rowData["Applicant"].lastname
      );
    } else {
      return rowData[item.field];
    }
  };

  const signedrenderName = (rowData, item) => {
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
      <div className="flex align-items-center gap-4">
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-primary"
          onClick={() => dispatch(SET_MODAL_STATE(true))}
          disabled={!selectedApplicant}
        />
        {/* <Button
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
        /> */}
      </div>
    );
  };

  // Looping on pending employee
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

  // Looping on signed employee
  const signedColumnComponent = signedColumns.map((item) => (
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
      body={signedrenderName}
      sortable
      filter
    />
  ));

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await dispatch(getAppointmentsInfo()).unwrap();
        console.log(fetchedData);
        console.log(appointmentInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [isOpened, selectedApplicant]);
  return (
    <div>
      <div className="header">Contract Signing</div>

      <div className="card">
        <TabView>
          <TabPanel header="Pending">
            <DataTable
              size="small"
              value={appointmentInfo}
              responsiveLayout="scroll"
              showGridlines
              header={renderHeader}
              selection={selectedApplicant}
              selectionMode="radiobutton"
              onSelectionChange={(e) => {
                dispatch(SET_SELECTED_APPLICANT(e.value)); //TODO: to be implemented later
                console.log(e.value.Applicant);
              }}
            >
              <Column
                selectionMode="single"
                headerStyle={{ width: "3em" }}
              ></Column>
              {columnComponent}
            </DataTable>
            <Dialog
              visible={isOpened}
              resizable={true}
              header="Contract Signing"
              style={{ width: "900px" }}
              className="p-fluid"
              modal
              onHide={() => dispatch(SET_MODAL_STATE(false))}
            >
              <ViewContractSigning />
            </Dialog>
          </TabPanel>
          {/* Signed Employee */}
          <TabPanel header="Signed">
            <DataTable
                size="small"
                value={appointmentInfo} //TODO: To be checked
                responsiveLayout="scroll"
                showGridlines
                selection={selectedApplicant}
                selectionMode="radiobutton"
                // onSelectionChange={(e) => {
                //   dispatch(SET_SELECTED_APPLICANT(e.value)); //TODO: to be implemented later
                //   console.log(e.value.Applicant);
                // }}
              >
                <Column
                  selectionMode="single"
                  headerStyle={{ width: "3em" }}
                ></Column>
                {signedColumnComponent}
              </DataTable>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Contract;
