import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicantsInfo } from "../redux/features/appoinmentReducer";
import { useFormik } from "formik";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import {
  initialValues,
  validationSchema,
} from "../yupUtils/comp/AppointmentYup";

const AddAppointment = () => {
  const dispatch = useDispatch();
  const { isModalOpened, applicantInfo, selectedApplicant } = useSelector(
    (store) => store.appointment
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const response = await axios.post(
          "http://localhost:5000/api/appointments",
          values
        );
        resetForm();
        console.log(response);
        notifyToast("Applicant Added", "success");
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

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await dispatch(getApplicantsInfo()).unwrap();
        console.log(fetchedData);
        console.log(applicantInfo);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white">
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Applicant
              </label>
              <div className="relative">
                <input
                  list="applicants"
                  id="applicant_id"
                  value={formik.values.applicant_id}
                  onChange={formik.handleChange}
                  className="select-decorator"
                />
                <datalist id="applicants">
                  {applicantInfo.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.firstname} {element.middlename}{" "}
                        {element.lastname}
                      </option>
                    );
                  })}
                </datalist>
                {getErrorMessage("applicant_id")}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/2">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Date
              </label>
              <input
                type="date"
                id="appointment_date"
                className={
                  isFieldValid("appointment_date")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.appointment_date}
                onChange={formik.handleChange}
              />
              {getErrorMessage("appointment_date")}
            </div>
            <div className="form-group w-full px-3 md:w-1/2">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Time
              </label>
              <input
                type="time"
                id="appointment_time"
                className={
                  isFieldValid("appointment_time")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.appointment_time}
                onChange={formik.handleChange}
              />
              {getErrorMessage("appointment_time")}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/2">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Location
              </label>
              <input
                type="text"
                id="appointment_location"
                placeholder="Enter location"
                className={
                  isFieldValid("appointment_location")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.appointment_location}
                onChange={formik.handleChange}
              />
              {getErrorMessage("appointment_location")}
            </div>
            <div className="form-group w-full px-3 md:w-1/2">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Type
              </label>
              <input
                type="text"
                id="appointment_type"
                placeholder="Enter type"
                className={
                  isFieldValid("appointment_type")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.appointment_type}
                onChange={formik.handleChange}
              />
              {getErrorMessage("appointment_type")}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Description
              </label>
              <textarea
                type="text"
                id="appointment_description"
                placeholder="Enter description"
                rows={3}
                className={
                  isFieldValid("appointment_description")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.appointment_description}
                onChange={formik.handleChange}
              ></textarea>
              {getErrorMessage("appointment_description")}
            </div>
          </div>
          <button
            type="submit"
            className="form-btn disabled:opacity-50 enabled:hover:bg-pink-400"
            disabled={!(formik.dirty && formik.isValid)}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAppointment;
