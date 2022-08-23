import React, { useEffect } from "react";
import axios from "axios";

//* React-Router-DOM IMPORTS
import { useNavigate } from "react-router-dom";

//* REDUX IMPORTS
import { useDispatch } from "react-redux";
import { LOGIN, RESET_STATE } from "../redux/features/authReducer";

//* FORM IMPORTS
import { initialValues, validationSchema } from "../yupUtils/auth/Login";
import { useFormik } from "formik";

//* TOAST IMPORTS
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let URL = "http://localhost:5000/api/auth";

      try {
        const response = await axios.post(URL, values);
        const data = await response.data;
        await dispatch(LOGIN(data));
        notifyToast("Login Successful", "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        console.log(error);
        notifyToast(error.response.data.message, "error");
      }
    },
  });

  useEffect(() => {
    dispatch(RESET_STATE());
  }, [dispatch]);

  return (
    <div className="h-screen font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-[60%,40%] h-full">
        {/* LEFT PANEL */}
        <div className="h-full hidden md:grid md:place-content-center bg-gray-600 px-4 ">
          <h1 className="text-white font-semibold text-6xl text-center">
            Orion Task Force Security Agency Co.,
          </h1>
        </div>

        {/* RIGHT PANEL */}
        <div className="h-full px-4">
          <div className="grid place-content-center h-full bg-white">
            <form onSubmit={formik.handleSubmit} className="max-w-[400px]">
              <h1 className="text-4xl font-medium text-gray-700 mb-10">
                Welcome to{" "}
                <span className="font-bold inline-block text-black ">
                  OTFSAC
                </span>
              </h1>
              <div className="grid mb-10">
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
              <div className="grid">
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

              <button
                type="submit"
                className="w-full my-4 p-2 bg-[#7F56DA] text-white rounded-lg shadow-lg"
              >
                Sign in
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
