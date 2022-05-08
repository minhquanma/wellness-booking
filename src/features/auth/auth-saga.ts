import { AxiosError } from 'axios';
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { call, put, StrictEffect, takeLatest, all } from "redux-saga/effects";
import { loginApi } from "./auth-api";
import { login,loginSuccess, loginFail, logOut } from "./auth-slice";
import { LoginPayload } from "./auth-types";
import { clearAllBookings } from 'features/bookings/booking-slice';


function getLoginErrorMessage(err: AxiosError) {
  if (err.response?.status === 404) {
    return "User not found"
  }
  return err.message
}

function* loginWorker({payload}: PayloadAction<LoginPayload>): Generator<StrictEffect> {
  try {
    // Call login api with provided credentials
    yield call(loginApi, payload);

    // Store logged user data
    yield put(loginSuccess({
      username: payload.username
    }));

    // Navigate to home screen when logged in successfully
    payload.navigate('/');

  } catch (err: AxiosError | any) {
    yield put(loginFail());
    
    toast.error(`Login failed: ${getLoginErrorMessage(err)}`);
  }
}

function *logoutWorker(): Generator<StrictEffect> {
  yield call(clearAllBookings)
}

function* authSaga() {
  yield all([takeLatest(login, loginWorker), takeLatest(logOut, logoutWorker)])
}

export default authSaga;
