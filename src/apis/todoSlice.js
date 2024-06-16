import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addTask = createAsyncThunk(
  "addTask",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://66309a6ec92f351c03da6930.mockapi.io/todo",
        data,
        {
          "Content-Type": "application/json",
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTasks = createAsyncThunk(
  "getTasks",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://66309a6ec92f351c03da6930.mockapi.io/todo",
        data,
        {
          "Content-Type": "application/json",
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://66309a6ec92f351c03da6930.mockapi.io/todo/${data}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editTask = createAsyncThunk(
  "editTask",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://66309a6ec92f351c03da6930.mockapi.io/todo/${data.id}`,
        data,
        {
          "Content-Type": "application/json",
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      state.tasks = state.tasks.filter((f) => f.id != id);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(editTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    });
    builder.addCase(editTask.rejected, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
  },
});

export default todoSlice.reducer;
