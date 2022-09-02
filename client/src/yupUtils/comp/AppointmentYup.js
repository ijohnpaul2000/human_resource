import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  applicant_id: Yup.string().required("New Applicant is required"),
  appointment_date: Yup.string().required("Appointment Date is required"),
  appointment_time: Yup.string().required("Appointment Time is required"),
  appointment_location: Yup.string().required(
    "Appointment Location is required"
  ),
  appointment_description: Yup.string().required(
    "Appointment Description is required"
  ),
  appointment_type: Yup.string().required("Appointment Type is required"),
});
