import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import { validationSchema } from "../yupUtils/comp/RequirementYup";
import axios from "axios";
import {
  SET_MODAL_STATE,
  SET_SELECTED_REQUIREMENT,
} from "../redux/features/requirementReducer";

const UpdateRequirement = () => {
  const dispatch = useDispatch();
  const { selectedRequirement } = useSelector((store) => store.requirements);

  //This will count and validate if the checkfields are all checked.
  const requirementList = document.querySelectorAll(".checkFields1");
  let counter = 0;

  const initialValues = {
    applicant_id: selectedRequirement?.applicant_id,
    pic2x2: selectedRequirement?.pic2x2,
    licenseCard: selectedRequirement?.licenseCard,
    neuroExam: selectedRequirement?.neuroExam,
    trainingCertificate: selectedRequirement?.trainingCertificate,
    openingClosingRep: selectedRequirement?.openingClosingRep,
    transcriptRecord: selectedRequirement?.transcriptRecord,
    firingCertificate: selectedRequirement?.firingCertificate,
    drugTestResult: selectedRequirement?.drugTestResult,
    brgyClearance: selectedRequirement?.brgyClearance,
    policeClearance: selectedRequirement?.policeClearance,
    nbiClearance: selectedRequirement?.nbiClearance,
    dilgClearance: selectedRequirement?.dilgClearance,
    hsCollegeCertificate: selectedRequirement?.hsCollegeCertificate,
    gkeResult: selectedRequirement?.gkeResult,
    nsoCerfiticate: selectedRequirement?.nsoCerfiticate,
    otherGovId: selectedRequirement?.otherGovId,
    completionStatus: selectedRequirement?.completionStatus,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      try {
        const response = await axios({
          method: "PUT",
          url: `http://api.orionhumanresource.gq//requirements/${selectedRequirement.applicant_id}`,
          data: values,
        });
        resetForm();
        notifyToast("Requirement Updated", "success");
        console.log(response);
        dispatch(SET_SELECTED_REQUIREMENT(""));
        reCloseModal();
      } catch (error) {
        notifyToast(error.response.data.message, "error");
      }
    },
  });

  const isFieldValid = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  const getErrorMessage = (error) => {
    return (
      isFieldValid(error) && (
        <small
          id="emailHelp"
          className="block mt-1 text-red-500 text-xs italic"
        >
          {formik.errors[error]}
        </small>
      )
    );
  };

  /* 
    Reopen Modal:
    1. To avoid initialValues problem in Formik. 
  */
  const reCloseModal = () => {
    setTimeout(() => {
      dispatch(SET_MODAL_STATE(false));
    }, 1000);
  };

  const requirementCategories = [
    { name: "Picture (2x2)", key: "pic2x2" },
    { name: "License Card", key: "licenseCard" },
    { name: "Neuro Exam", key: "neuroExam" },
    { name: "Training Cert", key: "trainingCertificate" },
    { name: "Opening/Closing Rep", key: "openingClosingRep" },
    { name: "Transcript Record", key: "transcriptRecord" },
    { name: "Firing Cert", key: "firingCertificate" },
    { name: "Drug Test", key: "drugTestResult" },
    { name: "Brgy Clearance", key: "brgyClearance" },
    { name: "Police Clearance", key: "policeClearance" },
    { name: "NBI Clearance", key: "nbiClearance" },
    { name: "DILG Clearance", key: "dilgClearance" },
    { name: "HS/College Cert", key: "hsCollegeCertificate" },
    { name: "GKE Result", key: "gkeResult" },
    { name: "NSO Cert", key: "nsoCerfiticate" },
  ];
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white">
      <form id="req_form" className="w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
          <div className="form-group w-full px-3">
            <label className="form-label inline-block mb-2 text-gray-700 font-bold">
              Applicant
            </label>
            <input
              type="text"
              id="applicant_id"
              disabled={true}
              className={
                isFieldValid("appointment_location")
                  ? "border-2 border-red-600 formFields"
                  : "formFields"
              }
              value={formik.values.applicant_id}
              onChange={formik.handleChange}
            />
            {getErrorMessage("applicant_id")}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
          <div className="form-group w-full px-3 md:w-1/2">
            <label className="form-label inline-block mb-2 text-gray-700 font-bold">
              Requirements
            </label>

            {requirementCategories.map((element) => {
              return (
                <div key={element.key}>
                  <input
                    className="checkFields1"
                    name={element.key}
                    type="checkbox"
                    value={formik.values[element.key]}
                    checked={formik.values[element.key] ? true : false}
                    id={element.key}
                    onChange={(e) => {
                      formik.handleChange(e);
                      // It will iterate the list of checkboxes
                      for (const iterator of requirementList) {
                        // If checked, count
                        if (iterator.checked) {
                          counter++;
                        }
                      }

                      /*
                        Conditions:
                        1. If checkboxes are all checked, status is complete.
                        2. If no checkboxes are checked or some are unchecked, status is incomplete.
                        3. Sorry boss refactor mo na lng kung kaya.
                      */
                      if (counter === 0) {
                        formik.values.completionStatus = false;
                      } else if (counter === requirementList.length) {
                        formik.values.completionStatus = true;
                      } else {
                        formik.values.completionStatus = false;
                      }
                    }}
                  />
                  <label
                    className="inline-block text-gray-800"
                    htmlFor={element.key}
                  >
                    {element.name}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="form-group w-full px-3 md:w-1/2">
            <label className="form-label inline-block mb-2 text-gray-700 font-bold">
              Completion Status
            </label>
            <div>
              <input
                className="checkFields2"
                type="checkbox"
                value={formik.values.completionStatus}
                checked={formik.values.completionStatus ? true : false}
                id="completionStatus"
                onChange={(e) => {
                  formik.handleChange(e);

                  let checkAll;

                  /* 
                    If user check the Complete Status, all the Requirements will be check also.
                  */
                  formik.values.completionStatus == false
                    ? (checkAll = true)
                    : (checkAll = false);

                  /* 
                    We loop the checkbox box fields of the form and set it according to
                    the Complete Status Value.

                    IF Complete Status is CHECKED then check all the checkboxes
                    IF Complete Status is UNCHECKED then uncheck all the checkboxes.
                  */
                  for (const iterator of requirementCategories) {
                    formik.values[iterator.key] = checkAll;
                  }
                }}
              />
              <label
                className="inline-block text-gray-800"
                htmlFor="flexCheckDefault"
              >
                {formik.values.completionStatus ? "Complete" : "Incomplete"}
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
          <div className="form-group w-full px-3">
            <label className="form-label inline-block mb-2 text-gray-700 font-bold">
              Other ID (Optional)
            </label>
            <input
              type="text"
              id="otherGovId"
              placeholder="Enter other IDs (optional)"
              className="formFields"
              value={formik.values.otherGovId}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="form-btn disabled:opacity-50 enabled:hover:bg-pink-400 mr-4"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateRequirement;
