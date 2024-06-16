import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "../apis/todoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Todo = () => {
  const [open, setOpen] = useState(false);
  const [operationMode, setOperationMode] = useState("add");
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    status: false,
    assignTo: "",
  });

  const { tasks, loading } = useSelector((state) => state.todoData);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  const handleSelect = (e, val) => {
    setTodoData({
      ...todoData,
      assignTo: val,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTodoData({
      title: "",
      description: "",
      status: false,
      assignTo: "",
    });
    setOperationMode("add");
  };

  const handleEdit = (id) => {
    tasks &&
      tasks.filter((m) => {
        if (id !== m.id) {
          return m;
        }
        setTodoData(m);
      });
    setOpen(true);
    setOperationMode("edit");
  };

  const handleDelete = (id) => {
    console.log(id);
    tasks &&
      tasks.map(async (m) => {
        if (id === m.id) {
          const res = await dispatch(deleteTask(m.id));

          if (res.type.includes("fulfilled")) {
            toast.warning("Deleted SuccessFully");
          }
        }
      });
  };

  const handleStatus = async (id) => {
    let data = tasks.find((item) => item.id == id);

    let finalData = {
      ...data,
      status: true,
    };

    const res = await dispatch(editTask(finalData));

    if (res.type.includes("fulfilled")) {
      toast.success("Marked as Done");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (operationMode === "add") {
      const res = await dispatch(addTask(todoData));

      if (res.type.includes("fulfilled")) {
        toast.success("Task added successfully");
        handleClose();
      }
    } else if (operationMode === "edit") {
      const res = await dispatch(editTask(todoData));

      console.log(res);

      if (res.type.includes("fulfilled")) {
        toast.success("Edited successfully");
        handleClose();
      }
    }
  };

  const users = [
    "Rushit",
    "Deval",
    "Gautam",
    "Tarun",
    "Aarsh",
    "Kishan",
    "Amit",
    "Vishal",
    "Aashish",
    "Divya",
    "Sachin",
    "Heer",
    "Suman",
  ];

  if (loading) {
    return (
      <h1 className="container d-flex justify-content-center flex-wrap">
        Loading.....
      </h1>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container d-flex justify-content-center">
          <h1>TODO list</h1>
        </div>
        <div className="container d-flex justify-content-center">
          <Button variant="contained" color="warning" onClick={handleOpen}>
            Add Task
          </Button>
        </div>
        <div className="container d-flex justify-content-center">
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {operationMode === "add" ? "Add" : "Edit"} Task
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="col-md-12">
                  <TextField
                    variant="outlined"
                    label="Title"
                    name="title"
                    className="mt-2"
                    value={todoData?.title}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    variant="outlined"
                    label="Description"
                    name="description"
                    className="mt-2"
                    value={todoData?.description}
                    onChange={handleChange}
                    fullWidth
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    className="mt-2 mb"
                    name="assignTo"
                    options={users}
                    value={todoData?.assignTo}
                    fullWidth
                    onChange={handleSelect}
                    renderInput={(params) => (
                      <TextField {...params} label="Assign To" />
                    )}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Stack direction={"row"} gap={2} className="me-3 mb-2">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  {operationMode === "add" ? "Add" : "Edit"}
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Stack>
            </DialogActions>
          </Dialog>
        </div>

        <div className="container d-flex justify-content-center flex-wrap">
          {tasks &&
            tasks.map((m, i) => {
              return (
                <div className="d-flex">
                  <div
                    // className="card m-3"
                    className="card m-3 shadow-sm w-100 w-md-50 w-lg-33"
                    // style={{ width: "23rem", boxShadow: "2px 2px 5px #878787" }}
                    key={i}
                  >
                    <div className="card-body">
                      {/* <h6 className="card-title">
                          <span
                            className="text-muted"
                            style={{ display: "inline-block", width: "7rem" }}
                          >
                            Title :
                          </span>{" "}
                          {m.title}
                        </h6>
                        <h6 className="card-subtitle mb-2">
                          <span
                            className="text-muted"
                            style={{ display: "inline-block", width: "7rem" }}
                          >
                            Description :{" "}
                          </span>{" "}
                          {m.description}
                        </h6>
                        <h6 className="card-subtitle mb-2">
                          <span
                            className="text-muted"
                            style={{ display: "inline-block", width: "7rem" }}
                          >
                            Assigned To :{" "}
                          </span>{" "}
                          {m.assignTo}
                        </h6>
                        <h6 className="card-subtitle mb-2">
                          <span
                            className="text-muted"
                            style={{ display: "inline-block", width: "7rem" }}
                          >
                            Status :
                          </span>
                          <Button className="m-0 p-0" color={m.status ? "success" : "error"} style={{cursor:'default'}}>{m.status ? "Done" : "Pending"}</Button>
                        </h6> */}

                      <h6 className="card-title d-flex">
                        <span
                          className="text-muted ms-2"
                          style={{ width: "7rem" }}
                        >
                          Title :
                        </span>{" "}
                        {m.title}
                      </h6>
                      <h6 className="card-subtitle mb-2 d-flex">
                        <span
                          className="text-muted ms-2"
                          style={{ width: "7rem" }}
                        >
                          Description :{" "}
                        </span>{" "}
                        {m.description}
                      </h6>
                      <h6 className="card-subtitle mb-2 d-flex">
                        <span
                          className="text-muted ms-2"
                          style={{ width: "7rem" }}
                        >
                          Assigned To :{" "}
                        </span>{" "}
                        {m.assignTo}
                      </h6>
                      <h6 className="card-subtitle mb-2 d-flex">
                        <span
                          className="text-muted ms-2"
                          style={{ width: "7rem" }}
                        >
                          Status :
                        </span>
                        <Button
                          className="m-0 p-0"
                          color={m.status ? "success" : "error"}
                          style={{ cursor: "default" }}
                        >
                          {m.status ? "Done" : "Pending"}
                        </Button>
                      </h6>

                      <Button
                        variant="contained"
                        color="success"
                        className="me-1"
                        disabled={m.status ? true : false}
                        onClick={() => handleStatus(m.id)}
                      >
                        {m.status ? "Approved" : "Approve"}
                      </Button>
                      <Button
                        variant="contained"
                        // variant="outlined"
                        color="info"
                        className="me-1"
                        onClick={() => handleEdit(m.id)}
                      >
                        edit
                      </Button>
                      <Button
                        // variant="outlined"
                        variant="contained"
                        color="error"
                        className="me-1"
                        onClick={() => handleDelete(m.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Todo;
