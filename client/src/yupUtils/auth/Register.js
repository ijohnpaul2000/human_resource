import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required"),
});
