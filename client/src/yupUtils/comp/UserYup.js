import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First Name is required"),
  middlename: Yup.string().required("Middle Name is required"),
  lastname: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  user_level: Yup.string().required("User Level is required"),
  email: Yup.string().required("Email is required"),
});
