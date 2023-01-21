import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../helpers/notifyToast";
import { validationSchema } from "../yupUtils/comp/ContractYup";
import { useRef } from "react";
import {
  getAppointmentsInfo,
  signContract,
} from "../redux/features/contractReducer";
import moment from "moment";

const ViewContractSigning = () => {
  const dispatch = useDispatch();
  const { selectedApplicant } = useSelector((store) => store.contract);

  const initialValues = {
    applicant_id: selectedApplicant?.applicant_id,
    salary: 0,
    contract_date: "",
  };

  const contractRef = useRef(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));

      const contractImage = contractRef.current.files[0];

      let formData = new FormData();
      formData.append("applicant_id", values.applicant_id);
      formData.append(
        "contract_date",
        moment(values.contract_date).format("YYYY-MM-DD")
      );
      formData.append("salary", values.salary);
      formData.append("contract_image", contractImage);

      console.log(formData);
      try {
        dispatch(signContract(formData));
        resetForm();
        dispatch(getAppointmentsInfo());
        // dispatch(SET_SELECTED_REQUIREMENT("")); //TODO: will be implemented
        // reCloseModal();
      } catch (error) {
        notifyToast(error, "error");
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

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
        <div className="form-group w-full px-3 md:w-1/3">
          <label className="form-label inline-block mb-2 text-gray-700 font-bold">
            Applicant ID
          </label>
          <input
            type="text"
            id="applicant_id"
            name="applicant_id"
            className="formFields"
            disabled
            value={formik.values.applicant_id}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
        <div className="form-group w-full px-3 md:w-1/3">
          <label className="form-label inline-block mb-2 text-gray-700 font-bold">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter first name"
            className="formFields"
            disabled
            value={selectedApplicant["Applicant"].firstname}
          />
        </div>

        <div className="form-group w-full px-3 md:w-1/3">
          <label className="form-label inline-block mb-2 text-gray-700 font-bold">
            Middle Name
          </label>
          <input
            type="text"
            id="middlename"
            name="middlename"
            placeholder="Enter middle name"
            className="formFields"
            disabled
            value={selectedApplicant["Applicant"].middlename}
          />
        </div>

        <div className="form-group w-full px-3 md:w-1/3">
          <div className="flex flex-wrap">
            <div className="w-full pr-3 w-4/6">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter lastname"
                className="formFields"
                disabled
                value={selectedApplicant["Applicant"].lastname}
              />
            </div>
            <div className="w-full pr-0 px-3 w-2/6">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Suffix
              </label>
              <input
                type="text"
                className="formFields"
                disabled
                id="suffix"
                name="suffix"
                placeholder="Suff."
                value={selectedApplicant["Applicant"].suffix}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
        <div className="form-group w-full px-3 md:w-1/3">
          <label
            className="form-label inline-block mb-2 text-gray-700 font-bold"
            htmlFor="salary"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="Enter salary"
            /* className="formFields" */
            className={
              isFieldValid("")
                ? "border-2 border-red-600 formFields"
                : "formFields"
            }
            value={formik.values.salary}
            onChange={formik.handleChange}
          />
          {/* {getErrorMessage("address")} */}
        </div>

        <div className="form-group w-full px-3 md:w-1/3">
          <label className="form-label inline-block mb-2 text-gray-700 font-bold">
            Contract Date
          </label>
          <input
            type="date"
            id="contract_date"
            name="contract_date"
            placeholder="Enter date"
            /* className="formFields" */
            className={
              isFieldValid("contact")
                ? "border-2 border-red-600 formFields"
                : "formFields"
            }
            value={formik.values.contract_date}
            onChange={formik.handleChange}
          />
          {/* {getErrorMessage("address")} */}
        </div>

        <div className="form-group w-full px-3 md:w-1/3">
          <label className="form-label inline-block mb-2 text-gray-700 font-bold">
            Contract Image
          </label>
          <input
            type="file"
            placeholder="Enter location"
            ref={contractRef}
            className={
              isFieldValid("address")
                ? "border-2 border-red-600 formFields"
                : "formFields"
            }
          />
          {getErrorMessage("address")}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="form-btn disabled:opacity-50 enabled:hover:bg-pink-400"
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default ViewContractSigning;
