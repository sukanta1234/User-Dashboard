import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper";
import { toast } from "react-toastify";
export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
});
export const registraton = createAsyncThunk("/user/signup", async (data) => {
  let response = await axiosInstance.post("/user/signup", data);
  return response.data;
});
export const loginApi = createAsyncThunk("/user/signin", async (data) => {
  let response = await axiosInstance.post("/user/signin", data);
  return response.data;
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    status: STATUS.IDLE,
    isLoggedIn: false,
    redirect_to: null,
  },
  reducers: {
    handleLogOut: (state, { payload }) => {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    check_token: (state) => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        state.isLoggedIn = true;
      }
    },
    resetRediect_To: (state, action) => {
      state.redirect_to = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registraton.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(registraton.fulfilled, (state, { payload }) => {
        state.status = STATUS.IDLE;
        if (payload.status === 200) {
          toast.success(payload.message);
        }
        if (payload.status === 201) {
          toast.error(payload.message);
        }
      })
      .addCase(registraton.rejected, (state) => {
        state.status = STATUS.IDLE;
      })
      .addCase(loginApi.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(loginApi.fulfilled, (state, { payload }) => {
        state.status = STATUS.IDLE;

        if (payload.status === 200) {
          toast.success(payload.message);
          state.isLoggedIn = true;
          localStorage.setItem("token", payload.token);
          state.redirect_to = "/home";
        }
        if (payload.status === 201) {
          toast.error(payload.message);
        }
      })
      .addCase(loginApi.rejected, (state) => {
        state.status = STATUS.IDLE;
      });
  },
});

export const { handleLogOut, check_token, resetRediect_To } = authSlice.actions;

export default authSlice.reducer;
