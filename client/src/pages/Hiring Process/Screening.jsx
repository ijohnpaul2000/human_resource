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
const Screening = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));
      try {
        const response = await axios.post(
          "http://localhost:5000/api/applicants/",
          values
        );
        console.log(response);
        notifyToast("Applicant Added", "success");
        if (values.isRequirementComplete === 1) {
          let data = {
            applicant_id: response.data.id,
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
            otherGovId: 1,
            completionStatus: 1,
          };

          try {
            const response = await axios.post(
              "http://localhost:5000/api/requirements/",
              data
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
        resetForm();
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
                Contact
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
              <input
                type="text"
                id="educational_background"
                placeholder="Enter education"
                className={
                  isFieldValid("educational_background")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.educational_background}
                onChange={formik.handleChange}
              />
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
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
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
                  <option value={"single"}>Single</option>
                  <option value={"married"}>Married</option>
                  <option value={"widowed"}>Widowed</option>
                  <option value={"divorced"}>Divorced</option>
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
                  <option value={"qualified"}>Qualified</option>
                  <option value={"not qualified"}>Not Qualified</option>
                  <option value={"incomplete requirements"}>
                    Incomplete Requirements
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <BsChevronRight />
                </div>
              </div>
            </div>
            <div className="form-group w-full px-3 md:w-1/4">
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

export default Screening;
