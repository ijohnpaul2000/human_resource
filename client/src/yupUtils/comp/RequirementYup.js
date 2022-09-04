import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  applicant_id: Yup.string().required("New Applicant is required"),
  completionStatus: Yup.string().required(" is required"),
});
