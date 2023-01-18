import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  // firstname: Yup.string().required("First Name is required"),
  // middlename: Yup.string().required("Middle Name is required"),
  // lastname: Yup.string().required("Last Name is required"),
  // suffix: Yup.string().notRequired(),
});
