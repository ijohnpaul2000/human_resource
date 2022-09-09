import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notifyToast } from "../helpers/notifyToast";

const ViewContractSigning = () => {
  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-white">
        <form className="w-full">
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
                // className={
                //   isFieldValid("firstname")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.firstname}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("firstname")} */}
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
                // className={
                //   isFieldValid("middlename")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.middlename}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("middlename")} */}
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
                    // className={
                    //   isFieldValid("lastname")
                    //     ? "border-2 border-red-600 formFields"
                    //     : "formFields"
                    // }
                    // value={formik.values.lastname}
                    // onChange={formik.handleChange}
                  />
                  {/* {getErrorMessage("lastname")} */}
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
                    // value={formik.values.suffix}
                    // onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                placeholder="Enter contact"
                className="formFields"
                // className={
                //   isFieldValid("contact")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.contact}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("contact")} */}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="formFields"
                // className={
                //   isFieldValid("email")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.email}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("email")} */}
            </div>

            <div className="form-group w-full px-3 md:w-1/3">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
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

          <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
            <div className="form-group w-full px-3 md:w-1/2">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Contact Number
              </label>
              <input
                type="date"
                id="contact"
                placeholder="Enter contact"
                className="formFields"
                // className={
                //   isFieldValid("contact")
                //     ? "border-2 border-red-600 formFields"
                //     : "formFields"
                // }
                // value={formik.values.contact}
                // onChange={formik.handleChange}
              />
              {/* {getErrorMessage("contact")} */}
            </div>

            <div className="form-group w-full px-3 md:w-1/2">
              <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                Appointment Location
              </label>
              <input
                type="text"
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
