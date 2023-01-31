import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../helpers/notifyToast";
import { validationSchema } from "../yupUtils/comp/ContractYup";
import { useRef } from "react";
import {
  editContract,
  getAppointmentsInfo,
  getContracts,
  SET_CONTRACT_MODAL_STATE,
  SET_MODAL_STATE,
  SET_SELECTED_CONTRACT,
  signContract,
} from "../redux/features/contractReducer";
import moment from "moment";
import { SET_SELECTED_USER } from "../redux/features/userReducer";
import { BsChevronRight } from "react-icons/bs";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const { selectedContract } = useSelector((store) => store.contract);
  const initialValues = {
    contract_id: selectedContract?.id,
    employee_id: selectedContract?.employee_id,
    contract_status: selectedContract?.contract_status,
    isEmployeeDeployed: selectedContract?.Employee?.isEmployeeDeployed,
  };

  const contractRef = useRef(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        dispatch(editContract(values))
          .unwrap()
          .then((res) => {
            if (res.status === "success") {
              notifyToast("Employee Edited Successfully.", "success");
            } else {
              notifyToast("Something went wrong.", "error");
            }
          });
        dispatch(getAppointmentsInfo());
        dispatch(SET_SELECTED_CONTRACT(""));
        resetForm();
      } catch (error) {
        notifyToast(error, "error");
      }
    },
  });
  console.log(formik.values);

  const isFieldValid = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  const getErrorMessage = (error) => {
    return (
      isFieldValid(error) && (
        <small
          id="emailHelp"
          className="block mt-1 text-xs italic text-red-500"
        >
          {formik.errors[error]}
        </small>
      )
    );
  };

  useEffect(() => {
    return () => {
      dispatch(
        SET_CONTRACT_MODAL_STATE({
          isContractModalOpen: false,
          contractModalType: "",
        })
      );
    };
  }, [dispatch]);

  return (
    <>
      <form
        className="w-full"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex flex-wrap mt-2 mb-2 -mx-3 gap-y-2">
          <div className="w-full px-3 form-group md:w-1/3">
            <label className="inline-block mb-2 font-bold text-gray-700 form-label">
              Employee ID
            </label>
            <input
              type="text"
              id="employee_id"
              name="employee_id"
              className="formFields"
              disabled
              value={formik.values.employee_id}
            />
          </div>
          <div className="w-full px-3 form-group md:w-1/3">
            <label className="inline-block mb-2 font-bold text-gray-700 form-label">
              Contract ID
            </label>
            <input
              type="text"
              id="contract_id"
              name="contract_id"
              className="formFields"
              disabled
              value={formik.values.contract_id}
            />
          </div>
        </div>
        <div className="flex flex-wrap mt-2 mb-2 -mx-3 gap-y-2">
          <div className="w-full px-3 form-group md:w-1/3">
            <label className="inline-block mb-2 font-bold text-gray-700 form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter first name"
              className="formFields"
              disabled
              value={selectedContract["Employee"]?.firstname}
            />
          </div>

          <div className="w-full px-3 form-group md:w-1/3">
            <label className="inline-block mb-2 font-bold text-gray-700 form-label">
              Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              name="middlename"
              placeholder="Enter middle name"
              className="formFields"
              disabled
              value={selectedContract["Employee"]?.middlename}
            />
          </div>

          <div className="w-full px-3 form-group md:w-1/3">
            <div className="flex flex-wrap">
              <div className="w-4/6 w-full pr-3">
                <label className="inline-block mb-2 font-bold text-gray-700 form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter lastname"
                  className="formFields"
                  disabled
                  value={selectedContract["Employee"]?.lastname}
                />
              </div>
              <div className="w-2/6 w-full px-3 pr-0">
                <label className="inline-block mb-2 font-bold text-gray-700 form-label">
                  Suffix
                </label>
                <input
                  type="text"
                  className="formFields"
                  disabled
                  id="suffix"
                  name="suffix"
                  placeholder="Suff."
                  value={selectedContract["Applicant"]?.suffix}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-2 mb-2 -mx-3 gap-y-2">
          <div className="w-full px-3 form-group md:w-1/3">
            <label
              className="inline-block mb-2 font-bold text-gray-700 form-label"
              htmlFor="contract_status"
            >
              Contract Status
            </label>
            <select
              type="text"
              id="contract_status"
              name="contract_status"
              placeholder="Enter contract_status"
              /* className="formFields" */
              className={
                isFieldValid("")
                  ? "border-2 border-red-600 formFields"
                  : "formFields"
              }
              value={formik.values.contract_status}
              onChange={formik.handleChange}
            >
              <option value="Active">Active</option>
              <option value="Endo">End of Contract</option>
              <option value="Inactive">Inactive</option>
            </select>
            {/* {getErrorMessage("address")} */}
          </div>

          <div className="w-full px-3 form-group md:w-1/3">
            <label
              className="inline-block mb-2 font-bold text-gray-700 form-label"
              htmlFor="isEmployeeDeployed"
            >
              Employee Deployment Status
            </label>
            <select
              type="text"
              id="isEmployeeDeployed"
              name="isEmployeeDeployed"
              /* className="formFields" */
              className={
                isFieldValid("")
                  ? "border-2 border-red-600 formFields"
                  : "formFields"
              }
              value={formik.values.isEmployeeDeployed}
              onChange={formik.handleChange}
            >
              <option
                value={formik.initialValues.isEmployeeDeployed}
                defaultValue
              >
                {formik.initialValues.isEmployeeDeployed === true
                  ? "Deployed"
                  : "Not Deployed"}
              </option>
              <option value={!formik.initialValues.isEmployeeDeployed}>
                {formik.initialValues.isEmployeeDeployed === false
                  ? "Deployed"
                  : "Not Deployed"}
              </option>
            </select>
            {/* {getErrorMessage("address")} */}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="form-btn disabled:opacity-50 enabled:hover:bg-pink-400"
          >
            Edit
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default EditEmployee;
