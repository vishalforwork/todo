import { ToastContainer } from "react-toastify";
import "./App.css";
import Todo from "./components/Todo";
import { useDispatch } from "react-redux";
import { getTasks } from "./apis/todoSlice";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Todo />
      </BrowserRouter>
    </>
  );
}

export default App;