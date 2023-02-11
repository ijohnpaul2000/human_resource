import React, { useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Chip } from "primereact/chip";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
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

// Filtration System
import { SET_FILTER, SET_GLOBAL_VALUE } from "../redux/filterReducer";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import axios from "axios";

const ManageUsers = () => {
  //Redux
  const dispatch = useDispatch();
  const { isModalOpened, userInfo, selectedUser } = useSelector(
    (store) => store.users
  );

  const { filters, globalFilterValue } = useSelector(
    (store) => store.filtration
  );

  const userLevel = ["admin", "super_user", "user", "applicant"];

  console.log(userInfo);
  const currentUser = useSelector((state) => state.auth.user.username);

  // Set the Filters while Searching
  const initFilter = () => {
    dispatch(
      SET_FILTER({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstname: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        email: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        username: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        user_level: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        date_added: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
      })
    );

    dispatch(SET_GLOBAL_VALUE(""));
  };

  // For User Level UI
  const userLevelBodyTemplate = (rowData) => {
    return <Chip label={rowData.user_level} />;
  };

  const userLevelFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={userLevel}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={userLevelItemTemplate}
        placeholder="Select a User Level"
        className="p-column-filter"
        showClear
      />
    );
  };

  const userLevelItemTemplate = (option) => {
    return (
      <span className={`requirement-badge status-complete`}>{option}</span>
    );
  };

  //Template for names
  const fullNameFilterTemplate = (rowData) => {
    return (
      <Chip
        label={`${rowData.firstname} ${rowData.middlename} ${rowData.lastname}`}
      />
    );
  };

  // Other columns for the table
  const columns = [
    {
      field: "firstname",
      header: "First Name",
      filterEl: "",
    },
    {
      field: "middlename",
      header: "Middle Name",
      filterEl: "",
    },
    {
      field: "lastname",
      header: "Last Name",
      filterEl: "",
    },
    {
      field: "email",
      header: "Email",
      filterEl: "",
    },
    {
      field: "username",
      header: "Username",
      filterEl: "",
    },
    {
      field: "user_level",
      header: "User Level",
      filterEl: userLevelFilterTemplate,
    },
    {
      field: "date_added",
      header: "Date Added",
      filterEl: "",
    },
  ];

  // To custom rendering of the data
  const renderName = (rowData, item) => {
    if (item.field === "name") {
      return fullNameFilterTemplate(rowData);
    } else if (item.field === "user_level") {
      return userLevelBodyTemplate(rowData);
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
      filterElement={item.filterEl}
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
    initFilter();

    return () => {
      console.log("test");
      SET_FILTER(null);
    }
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
        filters={filters}
        selection={selectedUser}
        selectionMode="radiobutton"
        filterDisplay="menu"
        globalFilterFields={[
          "firstname",
          "middlename",
          "lastname",
          "email",
          "username",
          "user_level",
          "date_added",
        ]}
        onSelectionChange={(e) => {
          dispatch(SET_SELECTED_USER(e.value));
        }}
      >
        <Column selectionMode="single" headerStyle={{ width: "3em" }} />
        
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
