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
  getContracts,
  SET_CONTRACT_MODAL_STATE,
  SET_MODAL_STATE,
  SET_SELECTED_APPLICANT,
  SET_SELECTED_CONTRACT,
} from "../../redux/features/contractReducer";
import ViewContractSigning from "../../components/ViewContractSigning";
import ContractImage from "../../components/ContractImage";
import EditEmployee from "../../components/EditEmployee";

const Contract = () => {
  const dispatch = useDispatch();
  const {
    isOpened,
    isContractModalOpened,
    appointmentInfo,
    applicantsInfo,
    selectedApplicant,
    selectedAppointment,
    selectedContract,
    activeContracts,
    contractModalType,
  } = useSelector((store) => store.contract);

  const columns = [
    { field: "Applicant", header: "Applicant" },
    { field: "appointment_type", header: "Appointment Type" },
  ];

  const signedColumns = [
    { field: "Employee", header: "Employee" },
    { field: "salary", header: "Salary" },
    { field: "contract_date", header: "Contract Date" },
    { field: "contract_status", header: "Contract Status" },
    { field: "contract_image", header: "Contract Image" },
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

  const signedrenderName = (rowData, item) => {
    if (item.field === "Employee") {
      return (
        rowData["Employee"]?.firstname + " " + rowData["Employee"]?.lastname
      );
    } else {
      return rowData[item.field];
    }
  };

  useEffect(() => {
    dispatch(SET_SELECTED_APPLICANT(null));
    dispatch(SET_SELECTED_CONTRACT(null));
    dispatch(getContracts());
    dispatch(
      SET_CONTRACT_MODAL_STATE({
        isContractModalOpen: false,
        contractModalType: "",
      })
    );
    return () => {
      dispatch(SET_SELECTED_APPLICANT(null));
      dispatch(SET_SELECTED_CONTRACT(null));
    };
  }, [dispatch]);

  const renderHeader = () => {
    return (
      <div className="flex gap-4 align-items-center">
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

  const renderHeaderSigned = () => {
    return (
      <div className="flex gap-4 align-items-center">
        <Button
          type="button"
          icon="pi pi-eye"
          className="p-button-primary"
          onClick={() =>
            dispatch(
              SET_CONTRACT_MODAL_STATE({ isOpen: true, type: "view_contract" })
            )
          }
          disabled={!selectedContract}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-primary"
          onClick={() =>
            dispatch(
              SET_CONTRACT_MODAL_STATE({ isOpen: true, type: "edit_employee" })
            )
          }
          disabled={!selectedContract}
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
    dispatch(getAppointmentsInfo());
  }, [dispatch]);
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
              }}
              onEmptied={() => dispatch(SET_SELECTED_APPLICANT(null))}
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
              onHide={() => {
                dispatch(SET_MODAL_STATE(false));
                dispatch(getAppointmentsInfo());
              }}
            >
              <ViewContractSigning />
            </Dialog>
          </TabPanel>
          {/* Signed Employee */}
          <TabPanel header="Signed">
            <DataTable
              size="small"
              value={activeContracts} //TODO: To be checked
              responsiveLayout="scroll"
              showGridlines
              header={renderHeaderSigned}
              selection={selectedContract}
              selectionMode="radiobutton"
              onSelectionChange={(e) => {
                dispatch(SET_SELECTED_CONTRACT(e.value)); //TODO: to be implemented later
                console.log(e.value);
              }}
              onEmptied={() => dispatch(SET_SELECTED_CONTRACT(null))}
            >
              <Column
                selectionMode="single"
                headerStyle={{ width: "3em" }}
              ></Column>

              {signedColumnComponent}
              <Column
                field={"Employee.isEmployeeDeployed"}
                header={"Deployment Status"}
                headerStyle={{
                  justifyContent: "center",
                  padding: "1rem 2rem",
                  wordBreak: "normal",
                  color: "#000",
                }}
                body={(rowData) => {
                  return (
                    <div>
                      {rowData.Employee.isEmployeeDeployed ? (
                        <p className="p-tag p-tag-success">Deployed</p>
                      ) : (
                        <p className="p-tag p-tag-danger">Not Deployed</p>
                      )}
                    </div>
                  );
                }}
                sortable
                filter
              />
            </DataTable>
          </TabPanel>
        </TabView>
        <Dialog
          visible={isContractModalOpened}
          resizable={true}
          header={
            contractModalType === "view_contract"
              ? "Contract Image"
              : "Edit Contract"
          }
          style={{ width: "900px" }}
          className="p-fluid"
          modal
          onHide={() => {
            dispatch(SET_CONTRACT_MODAL_STATE(false));
            dispatch(getAppointmentsInfo());
          }}
        >
          {contractModalType === "view_contract" ? (
            <ContractImage
              imageLink={
                selectedContract &&
                `http://localhost:5000/api/contract-image/${selectedContract.contract_image}`
              }
            />
          ) : (
            <EditEmployee />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Contract;
