import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GET_SINGLE_APPOINTMENT } from "../../redux/features/appoinmentReducer";

const ListAppointment = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user.id);
  const { singleAppointmentInfo } = useSelector((store) => store.appointment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `hhttp://api.orionhumanresource.gq/appointments/${userId}`
        );
        dispatch(GET_SINGLE_APPOINTMENT(res.data.appointment));
        console.log(res.data.appointment);
        console.log(userId);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-poppins font-semibold mb-4">Dashboard</h1>
      <div className="bg-[#005892] rounded-lg font-poppins text-white flex flex-col justify-between">
        <div className="p-4">
          <h1 className="font-extrabold text-5xl ">
            {singleAppointmentInfo ? 1 : 0}
          </h1>
          <h2 className="font-normal text-lg ">Appointment</h2>
        </div>
        <div className="w-full bg-[#033c61]  flex items-center p-4 rounded-b-lg">
          <div className="gap-y-2">
            <p className="mr-2 py-2">
              Appointment Date:
              <span className="pl-2">
                {singleAppointmentInfo
                  ? singleAppointmentInfo.appointment_date
                  : "No Available Date"}
              </span>
            </p>
            <p className="mr-2 py-2">
              Appointment Time:{" "}
              <span className="pl-2">
                {singleAppointmentInfo
                  ? singleAppointmentInfo.appointment_time
                  : "No Available Time"}
              </span>
            </p>
            <p className="mr-2 py-2">
              Appointment Location:{" "}
              <span className="pl-2">
                {singleAppointmentInfo
                  ? singleAppointmentInfo.appointment_location
                  : "No Available Location"}
              </span>
            </p>
            <p className="mr-2 py-2">
              Appointment Description:{" "}
              <span className="pl-2">
                {singleAppointmentInfo
                  ? singleAppointmentInfo.appointment_description
                  : "No Available Description"}
              </span>
            </p>
            <p className="mr-2 py-2">
              Appointment Type:{" "}
              <span className="pl-2">
                {singleAppointmentInfo
                  ? singleAppointmentInfo.appointment_type
                  : "No Available Type"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAppointment;
