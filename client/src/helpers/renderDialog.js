import { confirmDialog } from "primereact/confirmdialog";

export const renderDialog = (
  message,
  header,
  icon,
  modalType,
  acceptCallback
) => {
  const accept = () => {
    console.log("accept");
    acceptCallback();
  };

  const reject = () => {};

  return confirmDialog({
    message,
    header,
    icon,
    acceptClassName:
      modalType === "DANGER" ? "p-button-danger" : "p-button-primary",
    accept,
    reject,
  });
};
