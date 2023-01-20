import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  initialValues as onlineRegistrationInitialValues,
  validationSchema as onlineRegistrationvalidationSchema,
} from "../yupUtils/onlineRegistration/registration";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import NotAuthenticated from "./NotAuthenticated";

const RegisterApplicant = () => {
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth?.user.id);
  const applicantData = useSelector((state) => state.applicants.applicantsData);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: onlineRegistrationInitialValues,
    validationSchema: onlineRegistrationvalidationSchema,
    onSubmit: async (values) => {
      let url = "http://localhost:5000/api/applicants/";
      let data = {};
      data = { id: userId, ...values, applicationType: "Online" };

      try {
        const response = await axios.post(url, data);
        const responseData = await response.data;
        notifyToast(responseData.message, "success");
      } catch (error) {
        console.log(error);
        notifyToast(error.response.data.message, "error");
      }
    },
  });

  useEffect(() => {
    const fetchCurrentApplicant = async () => {
      let url = `http://localhost:5000/api/users/${userId}`;
      try {
        const response = await axios.get(url);
        const responseData = await response.data;
        console.log(responseData);
      } catch (error) {
        notifyToast(error.response.data.message, "error");
      }
    };
    fetchCurrentApplicant();
    navigate("/register-applicant");
  }, [navigate, userId]);

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  return (
    <div className="max-w-[1000px] mx-auto min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-center">
        Orion Task Force Security Agency Co.,{" "}
      </h1>
      <h1 className="text-xl font-semibold font-poppins">
        Online Applicant Registration
      </h1>

      <form onSubmit={formik.handleSubmit} className="mt-10 ">
        <h1 className="font-semibold font-poppins text-md">
          Applicant Information:{" "}
        </h1>
        <div className="grid grid-cols-2 xl:grid-cols-[1fr,1fr,1fr,70px] gap-4">
          {/* FIRST NAME */}
          <div className="grid mb-4">
            <label htmlFor="firstname">First Name</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              className="p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />

            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="text-red-400">{formik.errors.firstname}</div>
            ) : null}
          </div>
          {/* MIDDLE NAME */}
          <div className="grid mb-4">
            <label htmlFor="middlename">Middle Name</label>
            <input
              id="middlename"
              name="middlename"
              type="text"
              className="p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.middlename}
            />

            {formik.touched.middlename && formik.errors.middlename ? (
              <div className="text-red-400">{formik.errors.middlename}</div>
            ) : null}
          </div>

          {/* LASTNAME */}
          <div className="grid mb-4">
            <label htmlFor="lastname">Last Name</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              className="p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />

            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="text-red-400">{formik.errors.lastname}</div>
            ) : null}
          </div>

          {/* SUFFIX */}
          <div className="grid mb-4 max-w-[50px]">
            <label htmlFor="suffix">Suffix</label>
            <input
              id="suffix"
              name="suffix"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.suffix}
            />

            {formik.touched.suffix && formik.errors.suffix ? (
              <div className="text-red-400">{formik.errors.suffix}</div>
            ) : null}
          </div>
        </div>

        <div className="grid  grid-cols-2 xl:grid-cols-[.5fr,1fr,1fr,1fr] gap-4">
          <div className="grid mb-4 ">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />

            {formik.touched.age && formik.errors.age ? (
              <div className="text-red-400">{formik.errors.age}</div>
            ) : null}
          </div>
          <div className="grid mb-4">
            <label htmlFor="contact">Contact</label>
            <input
              id="contact"
              name="contact"
              type="text"
              className="p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
            />

            {formik.touched.contact && formik.errors.contact ? (
              <div className="text-red-400">{formik.errors.contact}</div>
            ) : null}
          </div>
          <div className="grid mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              className="p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        {/* //BREAKER */}
        <div className="w-full h-[2px] my-4 bg-gray-400"></div>

        <div className="grid grid-cols-[1fr,.5fr] gap-4">
          <div className="grid mb-4 ">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />

            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-400">{formik.errors.address}</div>
            ) : null}
          </div>
          <div className="grid mb-4 ">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />

            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-400">{formik.errors.city}</div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="grid mb-4 ">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthdate}
            />

            {formik.touched.birthdate && formik.errors.birthdate ? (
              <div className="text-red-400">{formik.errors.birthdate}</div>
            ) : null}
          </div>
          <div className="grid mb-4 ">
            <label htmlFor="birthplace">Birthplace</label>
            <input
              id="birthplace"
              name="birthplace"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthplace}
            />

            {formik.touched.birthplace && formik.errors.birthplace ? (
              <div className="text-red-400">{formik.errors.birthplace}</div>
            ) : null}
          </div>
          <div className="grid mb-4 ">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              name="sex"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sex}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {formik.touched.sex && formik.errors.sex ? (
              <div className="text-red-400">{formik.errors.sex}</div>
            ) : null}
          </div>
          <div className="grid mb-4 ">
            <label htmlFor="religion">Religion</label>
            <input
              id="religion"
              name="religion"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.religion}
            />

            {formik.touched.religion && formik.errors.religion ? (
              <div className="text-red-400">{formik.errors.religion}</div>
            ) : null}
          </div>
        </div>

        <div className="w-full h-[2px] my-4 bg-gray-400"></div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          <div className="grid mb-4 ">
            <label htmlFor="citizenship">Citizenship</label>
            <input
              id="citizenship"
              name="citizenship"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.citizenship}
            />

            {formik.touched.citizenship && formik.errors.citizenship ? (
              <div className="text-red-400">{formik.errors.citizenship}</div>
            ) : null}
          </div>{" "}
          <div className="grid mb-4 ">
            <label htmlFor="educational_background">
              Educational Background
            </label>
            <input
              id="educational_background"
              name="educational_background"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.educational_background}
            />

            {formik.touched.educational_background &&
            formik.errors.educational_background ? (
              <div className="text-red-400">
                {formik.errors.educational_background}
              </div>
            ) : null}
          </div>{" "}
          <div className="grid mb-4 ">
            <label htmlFor="civil_status">Civil Status</label>
            <select
              id="civil_status"
              name="civil_status"
              type="text"
              className="w-full p-2 border-2 border-gray-400 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.civil_status}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
              <option value="Divorced">Divorced</option>
            </select>

            {formik.touched.civil_status && formik.errors.civil_status ? (
              <div className="text-red-400">{formik.errors.civil_status}</div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 px-8 py-2 bg-[#7F56DA] text-sm rounded-lg text-white font-poppins "
          >
            Apply
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterApplicant;
