import { toast } from "react-toastify";
export const notifyToast = (message, type) => {
  if (type === "success") {
    return toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  } else if (type === "error") {
    return toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
};
