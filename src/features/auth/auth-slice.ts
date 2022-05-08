import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, LoginSuccessPayload } from "./auth-types";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      "username" : "hr1@gmail.com"
    },
    isLoggedIn: false,
    isLoading: false,
    isError: false
  },
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
    },
    logOut: (state) => {
      state.user = {
        username: ""
      };
      state.isLoggedIn = false;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    loginFail: (state) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const { login, logOut, loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;
