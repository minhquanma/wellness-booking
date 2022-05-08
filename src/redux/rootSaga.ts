import { all, fork } from "redux-saga/effects";
import authSaga from "features/auth/auth-saga";
import bookingSaga from "features/bookings/booking-saga";

// Combining all sagas into a root one
export default function* rootSaga() {
  yield all([fork(authSaga), fork(bookingSaga)]);
}