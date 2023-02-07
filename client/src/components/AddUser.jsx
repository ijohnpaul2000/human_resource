import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SELECTED_USER,
  USER_INFO,
  getUsersInfo,
  IS_MODAL_OPENED,
} from "../redux/features/userReducer";
import { useFormik } from "formik";
import axios from "axios";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import { Checkbox } from "primereact/checkbox";
import { Chip } from "primereact/chip";
import * as Yup from "yup";

const AddUser = () => {
  // useState for Checkbox
  const [checked, setChecked] = useState(false);

  const passwordValidatorMsg =
    "Password can only contain at least one numeric digit, one uppercase and one lowercase letter.";

  //Redux
  const dispatch = useDispatch();
  const { isModalOpened, userInfo, selectedUser } = useSelector(
    (store) => store.users
  );

  // Field initial values
  const initialValues = {
    id: selectedUser ? selectedUser?.id : "",
    firstname: selectedUser ? selectedUser?.firstname : "",
    middlename: selectedUser ? selectedUser?.middlename : "",
    lastname: selectedUser ? selectedUser?.lastname : "",
    username: selectedUser ? selectedUser?.username : "",
    password: "",
    cpassword: "",
    user_level: selectedUser ? selectedUser?.user_level : "user",
    email: selectedUser ? selectedUser?.email : "",
  };

  // From: https://stackoverflow.com/a/72975771/13848366
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    middlename: Yup.string().required("Middle Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: selectedUser
      ? Yup.string().notRequired()
      : Yup.string()
          .required("Password is required")
          .min(6, "Password is too short")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
            passwordValidatorMsg
          ),
    cpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
    user_level: Yup.string().required("User Level is required"),
    email: Yup.string().required("Email is required"),
  });

  // To initialize formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios({
          method: selectedUser ? "PUT" : "POST",
          url: selectedUser
            ? `http://localhost:5000/api/users/${selectedUser.id}`
            : "http://localhost:5000/api/users",
          data: {
            ...values,
            from_url: "manage-users",
          },
        });
        resetForm();
        dispatch(getUsersInfo());
        console.log(response);
        notifyToast(selectedUser ? "User Updated" : "User Added", "success");
        dispatch(SET_SELECTED_USER(""));
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
      selectedUser
        ? dispatch(IS_MODAL_OPENED(false))
        : dispatch(IS_MODAL_OPENED(true));
    }, 1000);
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
          className="block mt-1 text-xs italic text-red-500"
        >
          {formik.errors[error]}
        </small>
      )
    );
  };

  /* 
    In every change na nangyayari sa site (addition ng data, updating ng data) lagi tong magrurun. okay lang naman boss kasfksdfka PINANIS NI POL
  */
  useEffect(() => {
    dispatch(getUsersInfo());

    if (selectedUser === "") {
      setChecked(true);
    }
  }, [dispatch, selectedUser]);

  return (
    <div>
      <div className="block p-6 bg-white rounded-lg shadow-lg">
        <div
          className="text-center"
          style={
            !selectedUser
              ? { visibility: "hidden", display: "none" }
              : { visibility: "visible" }
          }
        >
          <img
            src={`https://api.multiavatar.com/${selectedUser.firstname}.svg`}
            className="w-32 mx-auto mb-4 rounded-full"
            alt="Avatar"
          />
          <div className="flex justify-center">
            <Chip
              label={`${selectedUser.firstname} ${selectedUser.middlename} ${selectedUser.lastname}`}
              icon="pi pi-user"
              className="mb-2 mr-2 custom-chip"
            />
            <Chip
              label={selectedUser.username}
              icon="pi pi-at"
              className="mb-2 mr-2"
            />
          </div>
          <div className="flex justify-center">
            <Chip
              label={selectedUser.email}
              icon="pi pi-envelope"
              className="mb-2 mr-2"
            />
          </div>
        </div>

        <form className="w-full" onSubmit={formik.handleSubmit}>
          {/* First Name to Last Name */}
          <div
            className="flex flex-wrap mt-2 mb-2 -mx-3 gap-y-2"
            style={
              selectedUser
                ? { visibility: "hidden", display: "none" }
                : { visibility: "visible" }
            }
          >
            <div className="w-full px-3 form-group md:w-1/3">
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
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

            <div className="w-full px-3 form-group md:w-1/3">
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
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

            <div className="w-full px-3 form-group md:w-1/3">
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
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
          </div>

          {/* Username to Email */}
          <div
            className="flex flex-wrap mt-2 mb-2 -mx-3 gap-y-2"
            style={
              selectedUser
                ? { visibility: "hidden", display: "none" }
                : { visibility: "visible" }
            }
          >
            <div className="w-full px-3 form-group md:w-1/2">
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
                User Name
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                className={
                  isFieldValid("username")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {getErrorMessage("username")}
            </div>

            <div className="w-full px-3 form-group md:w-1/2">
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
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
          </div>

          <div className="flex flex-wrap mt-2 mb-2 -mx-3 gap-y-2">
            <div className="w-full px-3 form-group">
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
                User Role
              </label>

              <div className="relative">
                <select
                  type="text"
                  id="user_level"
                  placeholder="Enter user level"
                  className={
                    isFieldValid("user_level")
                      ? "border-2 border-red-600 select-decorator"
                      : "select-decorator"
                  }
                  value={formik.values.user_level}
                  onChange={formik.handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="super_user">Super User</option>
                  <option value="user">Staff</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 pointer-events-none">
                  <BsChevronRight />
                </div>
              </div>
              {getErrorMessage("user_level")}
            </div>

            {/* For updating password */}

            <div
              className="field-checkbox"
              style={selectedUser ? { display: "block" } : { display: "none" }}
            >
              <Checkbox
                inputId="binary"
                className="ml-3 mr-2"
                checked={checked}
                onChange={(e) => setChecked(e.checked)}
              />
              <label htmlFor="binary">Change Password</label>
            </div>

            <div
              className="w-full px-3 form-group"
              style={checked ? { display: "block" } : { display: "none" }}
            >
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className={
                  isFieldValid("password")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {getErrorMessage("password")}
            </div>
            <div
              className="w-full px-3 form-group"
              style={checked ? { display: "block" } : { display: "none" }}
            >
              <label className="inline-block mb-2 font-bold text-gray-700 form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm password"
                className={
                  isFieldValid("cpassword")
                    ? "border-2 border-red-600 formFields"
                    : "formFields"
                }
                value={formik.values.cpassword}
                onChange={formik.handleChange}
              />
              {getErrorMessage("cpassword")}
            </div>
          </div>
          <button
            type="submit"
            className="form-btn disabled:opacity-50 enabled:hover:bg-pink-400"
            // disabled={!(formik.dirty && formik.isValid)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
