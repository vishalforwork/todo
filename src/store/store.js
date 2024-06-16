import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../apis/todoSlice";

const store = configureStore({
  reducer: {
    todoData: todoSlice,
  },
});

export default store;
