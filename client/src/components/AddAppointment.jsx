import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronRight } from "react-icons/bs";
import {
  getApplicantsInfo,
  IS_MODAL_OPENED,
  SET_SELECTED_APPOINTMENT,
} from "../redux/features/appoinmentReducer";
import { useFormik } from "formik";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { validationSchema } from "../yupUtils/comp/AppointmentYup";

const dayjs = require("dayjs");

/*
 * * ADD AND UPDATING APPOINTMENT
 * * THE COMPONENT HAVE TWO FUNCTIONALITIES THAT CAN BE CHOSEN BY THE USER
 * * TO ADD AN APPOINTMENT OR EDIT IT
 */
const AddAppointment = () => {
  const dispatch = useDispatch();

  /*
    This object will handle the Applicants Info and the behavior of modals and alerts.
  */
  const {
    isModalOpened,
    applicantInfo,
    selectedApplicant,
    selectedAppointment,
  } = useSelector((store) => store.appointment);

  /* 
    The following blocks of code have two functionalities based sa mapipili ng user:
    1. Update Appointment: It will display the selected appointment na need iupdate.
    2. Add Appointment: Walang laman ang mga initial values dahil ang user ay mag aadd
      pa lang ng new appointment.
  */
  const initialValues = {
    applicant_id: selectedAppointment ? selectedAppointment?.applicant_id : "",
    appointment_date: selectedAppointment
      ? selectedAppointment?.appointment_date
      : "",
    appointment_time: selectedAppointment
      ? selectedAppointment?.appointment_time
      : "",
    appointment_location: selectedAppointment
      ? selectedAppointment?.appointment_location
      : "",
    appointment_description: selectedAppointment
      ? selectedAppointment?.appointment_description
      : "",
    appointment_type: selectedAppointment
      ? selectedAppointment?.appointment_type
      : "1st Interview",
  };

  /* 
    Ang bubuo ng form at maghahandle ng data papunta sa database
  */
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const response = await axios({
          method: selectedAppointment ? "PUT" : "POST",
          url: selectedAppointment
            ? `http://178.128.114.212/api/appointments/${selectedAppointment.id}`
            : "http://178.128.114.212/api/appointments",
          data: values,
        });
        resetForm();
        console.log(response);
        notifyToast(
          selectedAppointment ? "Applicant Updated" : "Applicant Added",
          "success"
        );
        dispatch(SET_SELECTED_APPOINTMENT(""));
        reCloseModal();
      } catch (error) {
        notifyToast(error.response.data.message, "error");
      }
    },
  });

  /* 
    Reopen Modal:
    1. To avoid initialValues problem in Formik. 
  */
  const reCloseModal = () => {
    setTimeout(() => {
      selectedAppointment
        ? dispatch(IS_MODAL_OPENED(false))
        : dispatch(IS_MODAL_OPENED(true));
    }, 1000);
  };

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
    In every change na nangyayari sa site (addition ng data, updating ng data) lagi tong magrurun.
  */
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

  /* 
    The rendered user interface na makikita ng user.
  */
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
                min={dayjs().format("YYYY-MM-DD")}
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

              <div className="relative">
                <select
                  id="appointment_type"
                  className={
                    isFieldValid("appointment_type")
                      ? "border-2 border-red-600 select-decorator"
                      : "select-decorator"
                  }
                  value={formik.values.appointment_type}
                  onChange={formik.handleChange}
                >
                  <option value="Screening">Screening</option>
                  <option value="2nd Interview">2nd Interview</option>
                  <option value="Examination">Examination</option>
                  <option value="Orientation">Orientation</option>
                  <option value="Contract Signing">Contract Signing</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
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
