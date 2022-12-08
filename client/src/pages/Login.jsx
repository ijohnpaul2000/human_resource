import React, { useEffect } from "react";
import axios from "axios";
import loading from "../assets/puff.svg";

//* React-Router-DOM IMPORTS
import { Link, useNavigate } from "react-router-dom";

//* REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN,
  RESET_STATE as AUTH_RESET,
} from "../redux/features/authReducer";
import {
  SET_APP_LOADING,
  SET_APP_MESSAGE,
  RESET_STATE as APP_RESET,
  SET_APP_AUTH_STATE,
} from "../redux/features/appReducer";

//* FORM IMPORTS
import {
  initialValues as LoginInitialValues,
  validationSchema as LoginValidation,
} from "../yupUtils/auth/Login";
import {
  initialValues as RegisterInitialValues,
  validationSchema as RegistrationValidation,
} from "../yupUtils/auth/Register";
import { useFormik } from "formik";

//* TOAST IMPORTS
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import { v4 } from "uuid";

const Login = () => {
  console.log(process.env.NODE_ENV);

  const dispatch = useDispatch();

  const isAppLoading = useSelector((state) => state.app.isAppLoading);
  const appAuthState = useSelector((state) => state.app.appAuthState);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:
      appAuthState === "Login" ? LoginInitialValues : RegisterInitialValues,
    validationSchema:
      appAuthState === "Login" ? LoginValidation : RegistrationValidation,
    onSubmit: async (values) => {
      let authURL = `http://api.orionhumanresource.gq/${
        appAuthState === "Login" ? "auth" : "users"
      }`;

      let data = {};
      data = { id: v4(), ...values };

      const dataToSend =
        appAuthState === "Register" ? data : { id: v4(), ...values };

      console.log(appAuthState, dataToSend);

      dispatch(SET_APP_LOADING(true));

      try {
        const response = await axios.post(authURL, dataToSend);
        const data = await response.data;
        {
          appAuthState === "Login" && dispatch(LOGIN(data));
        }
        notifyToast(
          appAuthState === "Login"
            ? "Login Succesful! Redirecting..."
            : "You may now use this account.",
          "success"
        );
        setTimeout(() => {
          navigate("/dashboard");
          dispatch(SET_APP_LOADING(false));
        }, 2000);
      } catch (error) {
        notifyToast(error.response.data.message, "error");
        setTimeout(() => {
          dispatch(SET_APP_LOADING(false));
        }, 2000);
      }
    },
  });

  useEffect(() => {
    dispatch(AUTH_RESET());
    dispatch(APP_RESET());
  }, [dispatch]);

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[60%,40%] h-full">
        {/* LEFT PANEL */}
        <div className="h-full hidden md:grid md:place-content-center bg-gray-600 px-4 ">
          <h1 className="text-white font-semibold text-6xl text-center">
            Orion Task Force Security Agency Co.,
          </h1>
        </div>

        {/* RIGHT PANEL */}
        <div className="h-full px-4 w-full">
          <div className={`grid place-content-center h-full bg-white w-full `}>
            <h1>Super User: superuserOTFSAC</h1>
            <h1>Password: superuserOTFSAC</h1>
            <h1>Admin: AdminOTFSAC</h1>
            <h1>Password: AdminOTFSAC</h1>
            <br />

            <form
              onSubmit={formik.handleSubmit}
              className={`${
                appAuthState === "Login" ? "max-w-[400px]" : "w-full"
              }`}
            >
              <h1
                className={`text-4xl font-medium text-gray-700 mb-7 ${
                  appAuthState === "Register" ? "col-span-3" : ""
                }`}
              >
                {appAuthState === "Login" ? (
                  <>
                    Welcome to{" "}
                    <span className="font-bold inline-block text-black ">
                      OTFSAC
                    </span>
                  </>
                ) : (
                  <div>
                    Create An{" "}
                    <span className="font-bold inline-block text-black ">
                      Account
                    </span>
                  </div>
                )}
              </h1>

              {/* FULL NAME COLUMN FOR REGISTRATION */}
              {appAuthState === "Register" && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                  <div className="grid mb-7">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="border-gray-400 border-2 rounded-lg p-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstname}
                    />

                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="text-red-400">
                        {formik.errors.firstname}
                      </div>
                    ) : null}
                  </div>
                  {/* //MIDDLE NAME */}

                  <div className="grid mb-7">
                    <label htmlFor="middlename">Middle Name (Optional)</label>
                    <input
                      id="middlename"
                      name="middlename"
                      type="text"
                      className="border-gray-400 border-2 rounded-lg p-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.middlename}
                    />

                    {formik.touched.middlename && formik.errors.middlename ? (
                      <div className="text-red-400">
                        {formik.errors.middlename}
                      </div>
                    ) : null}
                  </div>
                  <div className="grid mb-7">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="border-gray-400 border-2 rounded-lg p-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                    />

                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div className="text-red-400">
                        {formik.errors.lastname}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}

              <div
                className={`${
                  appAuthState === "Login"
                    ? ""
                    : "grid grid-cols-1 xl:grid-cols-2 gap-3"
                }`}
              >
                <div className="grid mb-7">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="border-gray-400 border-2 rounded-lg p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />

                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-400">{formik.errors.username}</div>
                  ) : null}
                </div>
                {appAuthState === "Register" && (
                  <div className="grid mb-7">
                    <label htmlFor="username">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="border-gray-400 border-2 rounded-lg p-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />

                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-400">{formik.errors.email}</div>
                    ) : null}
                  </div>
                )}
              </div>
              <div
                className={`${
                  appAuthState === "Login"
                    ? ""
                    : "grid grid-cols-1 xl:grid-cols-2 gap-3"
                }`}
              >
                {/* PASSWORD */}
                <div
                  className={`${
                    appAuthState === "Register" ? "mb-7 grid" : "grid"
                  }`}
                >
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="border-gray-400 border-2 rounded-lg p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-400">{formik.errors.password}</div>
                  ) : null}
                </div>
                {/* CONFIRM PASSWORD */}
                {appAuthState === "Register" && (
                  <div
                    className={`${
                      appAuthState === "Register" ? "mb-7 grid" : "grid"
                    }`}
                  >
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="border-gray-400 border-2 rounded-lg p-2"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="text-red-400">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center my-4 p-2 bg-[#7F56DA] text-white rounded-lg shadow-lg"
                disabled={isAppLoading}
              >
                {isAppLoading && appAuthState === "Login" ? (
                  <>
                    <img src={loading} alt="" className="w-6 h-6" />
                    <span className="ml-2">Logging In...</span>
                  </>
                ) : null}
                {isAppLoading && appAuthState === "Register" ? (
                  <>
                    <img src={loading} alt="" className="w-6 h-6" />
                    <span className="ml-2">Signing Up...</span>
                  </>
                ) : null}

                {appAuthState === "Login" && !isAppLoading ? "Login" : null}
                {appAuthState === "Register" && !isAppLoading
                  ? "Register"
                  : null}
              </button>
            </form>

            <div className="flex justify-between mb-4">
              {appAuthState === "Login" ? (
                <>
                  <p>Don't have an account?</p>
                  <button
                    className="text-blue-400 underline font-medium text-base underline-offset-1"
                    onClick={() => dispatch(SET_APP_AUTH_STATE("Register"))}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <p>Have an account?</p>
                  <button
                    className="text-blue-400 underline font-medium text-base underline-offset-1"
                    onClick={() => dispatch(SET_APP_AUTH_STATE("Login"))}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
