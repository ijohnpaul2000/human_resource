import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useFormik } from "formik";
import axios from "axios";
import { notifyToast } from "../../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import {
  initialValues,
  validationSchema,
} from "../../yupUtils/comp/ScreeningYup";
const { v4 } = require("uuid");

const Screening = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let data = {};
      let uuid = v4();
      data = { ...values, applicationType: "Office", id: uuid };

      try {
        const response = await axios.post(
          "hhttp://api.orionhumanresource.gq/applicants/",
          data
        );
        console.log(response);
        notifyToast("Applicant Added", "success");

        //Requirements Checker. rap ulit
        checkRequirements(values.isRequirementComplete, uuid);
        createAccount(
          uuid,
          values.firstname,
          values.middlename,
          values.lastname,
          values.email
        );

        resetForm();
      } catch (error) {
        notifyToast(error.response.data.message, "error");
      }
    },
  });

  const createAccount = async (id, firstname, middlename, lastname, email) => {
    const data = {
      id: id,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      username: firstname,
      password: firstname + lastname,
      user_level: "applicant",
      email: email,
    };

    try {
      const response = await axios.post(
        "hhttp://api.orionhumanresource.gq/users/",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // If applicant's requirement is complete. run this function to mark all requirements as complete. rap
  const checkRequirements = async (requirement, applicant) => {
    let data = {};
    if (requirement === 1) {
      data = {
        applicant_id: applicant,
        pic2x2: 1,
        licenseCard: 1,
        neuroExam: 1,
        trainingCertificate: 1,
        openingClosingRep: 1,
        transcriptRecord: 1,
        firingCertificate: 1,
        drugTestResult: 1,
        brgyClearance: 1,
        policeClearance: 1,
        nbiClearance: 1,
        dilgClearance: 1,
        hsCollegeCertificate: 1,
        gkeResult: 1,
        nsoCerfiticate: 1,
        otherGovId: "",
        completionStatus: 1,
      };
    } else {
      data = {
        applicant_id: applicant,
        pic2x2: 0,
        licenseCard: 0,
        neuroExam: 0,
        trainingCertificate: 0,
        openingClosingRep: 0,
        transcriptRecord: 0,
        firingCertificate: 0,
        drugTestResult: 0,
        brgyClearance: 0,
        policeClearance: 0,
        nbiClearance: 0,
        dilgClearance: 0,
        hsCollegeCertificate: 0,
        gkeResult: 0,
        nsoCerfiticate: 0,
        otherGovId: "",
        completionStatus: 0,
      };
    }

    try {
      const response = await axios.post(
        "hhttp://api.orionhumanresource.gq/requirements/",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Error Checker
  const isFieldValid = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  //Error Message
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
      <div className="header">Applicant Screening</div>
      <div className="block p-6 rounded-lg shadow-lg bg-white">
        <form className="w-full" onSubmit={formik.handleSubmit}>
          {/* First Name to Suffix */}
          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter first name"
                className={
                  isFieldValid("firstname")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.firstname}
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
                className={
                  isFieldValid("middlename")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.middlename}
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
                    className={
                      isFieldValid("lastname")
                        ? "border-2 border-red-600 formFields"
                        : "formFields"
                    }
                    value={formik.values.lastname}
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
                    id="suffix"
                    placeholder="Suff."
                    value={formik.values.suffix}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact to Address */}
          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                placeholder="Enter contact"
                className={
                  isFieldValid("contact")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.contact}
                onChange={formik.handleChange}
              />
              {getErrorMessage("contact")}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className={
                  isFieldValid("email")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {getErrorMessage("email")}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                className={
                  isFieldValid("address")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {getErrorMessage("address")}
            </div>
          </div>

          {/* City to Birthplace  */}
          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                className={
                  isFieldValid("city")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              {getErrorMessage("city")}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <div className="flex flex-wrap">
                <div className="w-full pr-3 w-4/6">
                  <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    placeholder="Enter birthdate"
                    className={
                      isFieldValid("birthdate")
                        ? "border-2 border-red-600 formFields"
                        : "formFields"
                    }
                    value={formik.values.birthdate}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue(
                        "age",
                        new Date().getFullYear() -
                          new Date(e.target.value).getFullYear()
                      );
                    }}
                  />
                  {getErrorMessage("birthdate")}
                </div>
                <div className="w-full pr-0 px-3 w-2/6">
                  <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    min={18}
                    placeholder="Age"
                    className={
                      isFieldValid("age")
                        ? "border-2 border-red-600 formFields"
                        : "formFields"
                    }
                    value={formik.values.age}
                    onChange={formik.handleChange}
                  />
                  {getErrorMessage("age")}
                </div>
              </div>
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Birthplace
              </label>
              <input
                type="text"
                id="birthplace"
                placeholder="Enter birthplace"
                className={
                  isFieldValid("birthplace")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.birthplace}
                onChange={formik.handleChange}
              />
              {getErrorMessage("birthplace")}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Citizenship
              </label>
              <input
                type="text"
                id="citizenship"
                placeholder="Enter citizenship"
                className={
                  isFieldValid("citizenship")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.citizenship}
                onChange={formik.handleChange}
              />
              {getErrorMessage("citizenship")}
            </div>

            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Educational Background
              </label>

              <div className="relative">
                <select
                  type="text"
                  id="educational_background"
                  placeholder="Enter education"
                  className={
                    isFieldValid("educational_background")
                      ? "border-2 border-red-600 select-decorator"
                      : "select-decorator"
                  }
                  value={formik.values.educational_background}
                  onChange={formik.handleChange}
                >
                  <option value="Elementary">Elementary</option>
                  <option value="High School">High School</option>
                  <option value="College">College</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
              {getErrorMessage("educational_background")}
            </div>

            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Religion
              </label>
              <input
                type="text"
                id="religion"
                placeholder="Enter religion"
                className={
                  isFieldValid("religion")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.religion}
                onChange={formik.handleChange}
              />
              {getErrorMessage("religion")}
            </div>

            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Sex
              </label>
              <div className="relative">
                <select
                  className="select-decorator"
                  id="sex"
                  value={formik.values.sex}
                  onChange={formik.handleChange}
                >
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Notes
              </label>
              <textarea
                type="text"
                className="formFields"
                rows={3}
                id="application_notes"
                placeholder="Enter notes"
                value={formik.values.application_notes}
                onChange={formik.handleChange}
              ></textarea>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Submitted Requirement
              </label>
              <div className="relative">
                <select
                  className="select-decorator"
                  id="isRequirementComplete"
                  value={formik.values.isRequirementComplete}
                  onChange={formik.handleChange}
                >
                  <option value={1}>Complete</option>
                  <option value={0}>Incomplete</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
            </div>
            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Civil Status
              </label>
              <div className="relative">
                <select
                  className="select-decorator"
                  id="civil_status"
                  value={formik.values.civil_status}
                  onChange={formik.handleChange}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
            </div>
            <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Applicant Status
              </label>
              <div className="relative">
                <select
                  className="select-decorator"
                  id="applicant_status"
                  value={formik.values.applicant_status}
                  onChange={formik.handleChange}
                >
                  <option value={"Qualified"}>Qualified</option>
                  <option value={"Not Qualified"}>Not Qualified</option>
                  <option value={"Incomplete Requirements"}>
                    Incomplete Requirements
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
            </div>
            {/* <div className="form-group w-full px-3 md:w-1/4">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Application Status
              </label>
              <div className="relative">
                <select
                  className="select-decorator"
                  id="application_status"
                  value={formik.values.application_status}
                  onChange={formik.handleChange}
                >
                  <option value={"screening"}>Screening</option>
                  <option value={"interview"}>Interview</option>
                  <option value={"deployment"}>Deployment</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
            </div> */}
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

export default Screening;
