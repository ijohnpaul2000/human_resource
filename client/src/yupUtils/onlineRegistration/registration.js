import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  middlename: "",
  lastname: "",
  suffix: "",
  age: "",
  contact: "",
  email: "",
  address: "",
  city: "",
  birthdate: "",
  birthplace: "",
  sex: "",
  religion: "",
  citizenship: "",
  educational_background: "",
  civil_status: "",
};
export const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  age: Yup.number().required("Age is required"),
  contact: Yup.number().required("Contact number is required"),
  email: Yup.string().required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  birthdate: Yup.string().required("Birthdate is required"),
  birthplace: Yup.string().required("Birthplace is required"),
  sex: Yup.string().required("Sex is required"),
  religion: Yup.string().required("Religion is required"),
  citizenship: Yup.string().required("Citizenship is required"),
  educational_background: Yup.string().required(
    "Educational Background is required"
  ),
  civil_status: Yup.string().required("Civil status is required"),
});
