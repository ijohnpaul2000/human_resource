import React, { useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicantsInfo,
  SET_SELECTED_APPLICANT,
} from "../redux/features/appoinmentReducer";
import { useFormik } from "formik";
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
      alert(JSON.stringify(values, null, 2));
      // try {
      //   const response = await axios.post(
      //     "http://localhost:5000/api/applicants/",
      //     values
      //   );
      //   console.log(response);
      //   notifyToast("Applicant Added", "success");
      // } catch (error) {
      //   notifyToast(error, "error");
      // }
      resetForm();
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

  //Selected Option UI
  const selectedOption = (option, props) => {
    if (option) {
      return (
        <div className="flex gap-x-4">
          <img
            alt={option.firstname}
            src="https://avatars.dicebear.com/api/micah/1.svg?background=%23510400"
            className="inline object-cover w-8 h-8 rounded-full"
          />
          <div className="self-center">
            {option.firstname} {option.middlename} {option.lastname}
          </div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  // Dropdown Option UI
  const optionTemplate = (option) => {
    return (
      <div className="flex gap-x-4">
        <img
          alt={option.firstname}
          src="https://avatars.dicebear.com/api/micah/1.svg?background=%23510400"
          className="inline object-cover w-8 h-8 rounded-full"
        />
        <div className="self-center">
          {option.firstname} {option.middlename} {option.lastname}
        </div>
      </div>
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
  }, [dispatch]);

  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white">
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Applicant
              </label>

              <Dropdown
                id="applicant_id"
                value={formik.values.applicant_id}
                options={applicantInfo.map((el) => {
                  return el.firstname + " " + el.middlename + " " + el.lastname;
                })}
                placeholder="Select Applicant"
                filter={true}
                filterBy="id,firstname,middlename,lastname"
                onChange={formik.handleChange}
                showClear
                className={
                  isFieldValid("applicant_id") ? "border-2 border-red-600" : ""
                }
              />
              {getErrorMessage("applicant_id")}
              {/* <Dropdown
                value={formik.values.applicant_id}
                options={applicantInfo}
                id="applicant_id"
                onChange={formik.handleChange}
                optionLabel="id"
                placeholder="Select a City"
              /> */}
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
    </div>
  );
};

export default AddAppointment;
