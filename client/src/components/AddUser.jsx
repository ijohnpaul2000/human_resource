import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_USER, USER_INFO, getUsersInfo, IS_MODAL_OPENED } from "../redux/features/userReducer";
import { useFormik } from "formik";
import axios from "axios";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import { Checkbox } from 'primereact/checkbox';
import { validationSchema } from "../yupUtils/comp/UserYup";


const AddUser = () => {

  // useState for Checkbox
  const [checked, setChecked] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const { isModalOpened, userInfo, selectedUser } =
    useSelector((store) => store.users);
  

  // Field initial values
  const initialValues = {
    id: selectedUser ? selectedUser?.id : "",
    firstname: selectedUser ? selectedUser?.firstname : "",
    middlename: selectedUser ? selectedUser?.middlename : "",
    lastname: selectedUser ? selectedUser?.lastname : "",
    username: selectedUser ? selectedUser?.username : "",
    password: selectedUser ? selectedUser?.password : "",
    user_level: selectedUser ? selectedUser?.user_level : "",
    email: selectedUser ? selectedUser?.email : "",
  };

  // To initialize formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
    
      // try {
      //   const response = await axios.post(
      //     "http://localhost:5000/api/users/",
      //     data
      //   );
      //   console.log(response);
      //   notifyToast("User Added", "success");

      //   resetForm();
      // } catch (error) {
      //   notifyToast(error.response.data.message, "error");
      // }

      try {
        const response = await axios({
          method: selectedUser ? "PUT" : "POST",
          url: selectedUser
            ? `http://localhost:5000/api/users/${selectedUser.id}`
            : "http://localhost:5000/api/users",
          data: values,
        });
        resetForm();
        dispatch(getUsersInfo());
        console.log(response);
        notifyToast(
          selectedUser ? "User Updated" : "User Added",
          "success"
        );
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
          className="block mt-1 text-red-500 text-xs italic"
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

      // if (checked === false) {
      //   delete initialValues.password;
      // }
    }, [dispatch]);


    return (
      <div>
        <div className="block p-6 rounded-lg shadow-lg bg-white">
          <form className="w-full" onSubmit={formik.handleSubmit}>
          {/* First Name to Last Name */}
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
            </div>

          {/* Username to Role */}
            <div className="flex flex-wrap -mx-3 mt-2 mb-2 gap-y-2">
              <div className="form-group w-full px-3 md:w-1/3">
                <label className="form-label inline-block mb-2 text-gray-700 font-bold">
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

              <div className="form-group w-full px-3 md:w-1/4">
                <label className="form-label inline-block mb-2 text-gray-700 font-bold">
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
                    <option value="applicant">Applicant</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <BsChevronRight />
                  </div>
                </div>
                {getErrorMessage("user_level")}
              </div>

              {/* For updating password */}
              <div className="field-checkbox" style={selectedUser ? {display: "block"} : {display: "none"}}>
                <Checkbox inputId="binary" className="mr-2 ml-3" checked={checked} onChange={e => setChecked(e.checked)} />
                <label htmlFor="binary">Change Password</label>
              </div>

              <div className="form-group w-full px-3" style={checked ? {display: "block"} : {display: "none"}}>
                <label className="form-label inline-block mb-2 text-gray-700 font-bold">
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

              {/* <div className="form-group w-full px-3">
                <label className="form-label inline-block mb-2 text-gray-700 font-bold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Confirm password"
                  className={
                    isFieldValid("password")
                      ? "border-2 border-red-600 formFields"
                      : "formFields"
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {getErrorMessage("password")}
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
      </div>
    );
  };
  
  export default AddUser;