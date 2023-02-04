import React, { useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  SET_SELECTED_USER,
  USER_INFO,
  getUsersInfo,
  IS_MODAL_OPENED,
} from "../redux/features/userReducer";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "../components/AddUser";
import { renderDialog } from "../helpers/renderDialog";
import { notifyToast } from "../helpers/notifyToast";
import { ToastContainer } from "react-toastify";
import { SET_MODAL } from "../redux/features/modalReducer";

import axios from "axios";

const ManageUsers = () => {
  //Redux
  const dispatch = useDispatch();
  const { isModalOpened, userInfo, selectedUser } = useSelector(
    (store) => store.users
  );

  console.log(userInfo);
  const currentUser = useSelector((state) => state.auth.user.username);

  // Columns for the table
  const columns = [
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "username", header: "Username" },
    { field: "user_level", header: "User Level" },
    { field: "date_added", header: "Date Added" },
  ];

  // To join multiple columns
  const renderName = (rowData, item) => {
    if (item.field === "name") {
      return `${rowData.firstname} ${rowData.middlename} ${rowData.lastname}`;
    } else {
      return rowData[item.field];
    }
  };

  // Button Group on the top of table
  const renderHeader = () => {
    return (
      <div className="flex gap-4 align-items-center">
        <Button
          type="button"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={() => {
            dispatch(IS_MODAL_OPENED(true));
            dispatch(SET_SELECTED_USER(""));
          }}
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-primary"
          onClick={() => dispatch(IS_MODAL_OPENED(true))}
          disabled={!selectedUser}
          tooltipOptions={{ position: "bottom" }}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => {
            renderDialog(
              "Do you want to delete this?",
              "Delete Data",
              "pi pi-exclamation-triangle",
              "DANGER",
              deleteUser,
              dispatch(SET_MODAL({ isOpen: false }))
            );
            dispatch(getUsersInfo());
          }}
          disabled={!selectedUser}
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
    );
  };

  // Loop the Columns on the Table
  const columnComponent = columns.map((item) => (
    <Column
      key={item.field}
      field={item.field}
      header={item.header}
      headerStyle={{
        justifyContent: "center",
        padding: "1rem 2rem",
        wordBreak: "normal",
        color: "#000",
      }}
      body={renderName}
      sortable
      filter
    />
  ));

  //For Deleting a User
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${selectedUser.id}`
      );
      console.log(response);
      dispatch(getUsersInfo());
      notifyToast("Data Deleted", "success");
    } catch (error) {
      notifyToast(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  // Actual UI Renderer
  return (
    <div>
      <div className="header">Manage Users</div>
      <DataTable
        size="small"
        // userInfo.filter((element) => {
        //   return element.username !== currentUser;
        // })
        value={userInfo}
        responsiveLayout="scroll"
        showGridlines
        header={renderHeader}
        selection={selectedUser}
        selectionMode="radiobutton"
        onSelectionChange={(e) => {
          dispatch(SET_SELECTED_USER(e.value));
        }}
      >
        <Column selectionMode="single" headerStyle={{ width: "3em" }}></Column>
        {columnComponent}
      </DataTable>
      <Dialog
        visible={isModalOpened}
        resizable={true}
        header={selectedUser ? "Update User" : "New User"}
        style={{ width: "700px" }}
        className="p-fluid"
        modal
        onHide={() => dispatch(IS_MODAL_OPENED(false))}
      >
        <AddUser />
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;
