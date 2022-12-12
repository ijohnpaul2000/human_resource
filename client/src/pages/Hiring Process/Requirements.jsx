import React, { useEffect, useState } from "react";
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
  getRequirementsInfo,
  SET_MODAL_STATE,
  SET_SELECTED_REQUIREMENT,
} from "../../redux/features/requirementReducer";
import UpdateRequirement from "../../components/UpdateRequirement";
import { SET_MODAL } from "../../redux/features/modalReducer";

const Requirements = () => {
  const dispatch = useDispatch();
  const { requirementInfo, isOpened, selectedRequirement } = useSelector(
    (store) => store.requirements
  );
  const applicants = useSelector((state) => state.applicants.applicantsData);

  const renderHeader = () => {
    return (
      <div className="flex align-items-center gap-4">
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-primary"
          onClick={() => dispatch(SET_MODAL_STATE(true))}
          disabled={!selectedRequirement}
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
              deleteRequirement,
              dispatch(SET_MODAL({ isOpen: false }))
            );
          }}
          disabled={!selectedRequirement}
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    );
  };

  const deleteRequirement = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/requirements/${selectedRequirement.applicant_id}`
      );
      console.log(response);
      dispatch(SET_SELECTED_REQUIREMENT(""));
      notifyToast("Data Deleted", "success");
    } catch (error) {
      notifyToast(error.response.data.message, "error");
    }
  };

  const columns = [
    { field: "Applicant", header: "Applicant" },
    { field: "pic2x2", header: "Picture (2x2)" },
    { field: "licenseCard", header: "License Card" },
    { field: "neuroExam", header: "Neuro Exam" },
    { field: "trainingCertificate", header: "Training Cert" },
    { field: "openingClosingRep", header: "Opening/Closing Rep" },
    { field: "transcriptRecord", header: "Transcript Record" },
    { field: "firingCertificate", header: "Firing Cert" },
    { field: "drugTestResult", header: "Drug Test" },
    { field: "brgyClearance", header: "Brgy Clearance" },
    { field: "policeClearance", header: "Police Clearance" },
    { field: "nbiClearance", header: "NBI Clearance" },
    { field: "dilgClearance", header: "DILG Clearance" },
    { field: "hsCollegeCertificate", header: "HS/College Cert" },
    { field: "gkeResult", header: "GKE Result" },
    { field: "nsoCerfiticate", header: "NSO Cert" },
    { field: "otherGovId", header: "Other ID" },
    { field: "completionStatus", header: "Status" },
  ];

  const booleanChecker = (rowData, item) => {
    //console.log(rowData["Applicant"].lastName);
    if (typeof rowData[item.field] === "boolean") {
      return (
        <span
          className={`requirement-badge status-${
            rowData[item.field] ? "complete" : "incomplete"
          }`}
        >
          {rowData[item.field] ? "complete" : "incomplete"}
        </span>
      );
    } else {
      if (item.field === "Applicant") {
        return (
          rowData["Applicant"].firstname + " " + rowData["Applicant"].lastname
        );
      } else if (item.field === "otherGovId") {
        return rowData[item.field];
      } else {
        return (
          <span
            className={`requirement-badge status-${
              rowData[item.field] === "1" ? "complete" : "incomplete"
            }`}
          >
            {rowData[item.field] === "1" ? "complete" : "incomplete"}
          </span>
        );
      }
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
      body={booleanChecker}
      sortable
      filter
    />
  ));

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await dispatch(getRequirementsInfo()).unwrap();
        console.log(fetchedData);
        console.log(requirementInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [isOpened]);
  return (
    <div>
      <div className="header">Applicant Requirements</div>
      <DataTable
        size="small"
        value={requirementInfo}
        responsiveLayout="scroll"
        showGridlines
        header={renderHeader}
        selection={selectedRequirement}
        selectionMode="radiobutton"
        onSelectionChange={(e) => {
          dispatch(SET_SELECTED_REQUIREMENT(e.value));
        }}
      >
        <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
        {columnComponent}
      </DataTable>
      <Dialog
        visible={isOpened}
        header="Update Requirements"
        style={{ width: "700px" }}
        className="p-fluid"
        modal
        onHide={() => dispatch(SET_MODAL_STATE(false))}
      >
        <UpdateRequirement />
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Requirements;
