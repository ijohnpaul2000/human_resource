import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronRight } from "react-icons/bs";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../helpers/notifyToast";
import { validationSchema } from "../yupUtils/comp/ContractYup";


const ViewContractSigning = () => {

  const dispatch = useDispatch();
  const { selectedApplicant } = useSelector((store) => store.contract);

  //TODO: will be updated if JOHN PAUL created a model and relationship.
  const initialValues = {
    applicant_id: selectedApplicant?.applicant_id
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      try {
        const response = await axios({
          method: "PUT",
          //url: `http://localhost:5000/api/requirements/${selectedRequirement.applicant_id}`,
          data: values,
        });
        resetForm();
        notifyToast("Contract Updated", "success");
        console.log(response);
        // dispatch(SET_SELECTED_REQUIREMENT("")); //TODO: will be implemented
        // reCloseModal();
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

  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white">
        <form className="w-full">

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/3">
            <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Applicant ID
              </label>
              <input
                type="text"
                id="applicant_id"
                className="formFields"
                disabled
                value={formik.values.applicant_id}
                onChange={formik.handleChange}
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
                placeholder="Enter first name"
                className="formFields"
                disabled
                value={selectedApplicant["Applicant"].firstname}
                onChange={formik.handleChange}
              />
              {getErrorMessage("firstname")}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Middle Name
              </label>
              <input
                type="text"
                id="middlename"
                placeholder="Enter middle name"
                className="formFields"
                disabled
                value={selectedApplicant["Applicant"].middlename}
                onChange={formik.handleChange}
              />
              {getErrorMessage("middlename")}
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
                    placeholder="Enter lastname"
                    className="formFields"
                    disabled
                    value={selectedApplicant["Applicant"].lastname}
                    onChange={formik.handleChange}
                  />
                  {getErrorMessage("lastname")}
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
                    placeholder="Suff."
                    value={selectedApplicant["Applicant"].suffix}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
           
            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Salary
              </label>
              <input
                type="number"
                id="address"
                placeholder="Enter salary"
                className="formFields"
                // className={
                //   isFieldValid("")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.address}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("address")} */}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Contact Date
              </label>
              <input
                type="date"
                id="contact"
                placeholder="Enter date"
                className="formFields"
                // className={
                //   isFieldValid("contact")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.contact}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("address")} */}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Signature
              </label>
              <input
                type="file"
                id="address"
                placeholder="Enter location"
                className="formFields"
                // className={
                //   isFieldValid("address")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.address}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("address")} */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewContractSigning;
