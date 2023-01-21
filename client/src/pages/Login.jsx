import React from "react";
import loading from "../assets/puff.svg";

//* React-Router-DOM IMPORTS
import { useNavigate } from "react-router-dom";

//* REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/features/authReducer";

//* FORM IMPORTS
import {
  initialValues as LoginInitialValues,
  validationSchema as LoginValidation,
} from "../yupUtils/auth/Login";

import { useFormik } from "formik";

//* TOAST IMPORTS
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: LoginInitialValues,
    validationSchema: LoginValidation,
    onSubmit: async (values) => {
      dispatch(LOGIN(values))
        .unwrap()
        .then((res) => {
          localStorage.setItem("userToken", res.token);
          notifyToast("Login Successful", "success");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          notifyToast(err.message, "error");
        });
    },
  });

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[60%,40%] h-full">
        {/* LEFT PANEL */}
        <div className="hidden h-full px-4 bg-gray-600 md:grid md:place-content-center ">
          <h1 className="text-6xl font-semibold text-center text-white">
            Orion Task Force Security Agency Co.,
          </h1>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full h-full px-4">
          <div className={`grid place-content-center h-full bg-white w-full `}>
            <form onSubmit={formik.handleSubmit} className="max-w-[400px]">
              <h1 className="text-4xl font-medium text-gray-700 mb-7">
                Welcome to{" "}
                <span className="inline-block font-bold text-black ">
                  OTFSAC
                </span>
              </h1>

              <div>
                <div className="grid mb-7">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="p-2 border-2 border-gray-400 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />

                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-400">{formik.errors.username}</div>
                  ) : null}
                </div>
              </div>
              <div>
                {/* PASSWORD */}
                <div className="grid">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="p-2 border-2 border-gray-400 rounded-lg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-400">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex justify-center my-4 p-2 bg-[#7F56DA] text-white rounded-lg shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <img src={loading} alt="" className="w-6 h-6" />
                    <span className="ml-2">Logging In...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
