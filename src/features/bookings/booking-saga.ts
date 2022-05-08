import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, StrictEffect, takeLatest, all } from 'redux-saga/effects'
import { createBookingApi, getAllBookingsApi } from './booking-api'
import {
  getAllBookings,
  getAllBookingsFail,
  getAllBookingsSuccess,
  createBooking,
  createBookingSuccess,
  createBookingFail,
} from './booking-slice'
import { GetBookingPayload, CreateBookingPayload } from './booking-types'

function* getBookingsWorker({
  payload,
}: PayloadAction<GetBookingPayload>): Generator<StrictEffect> {
  try {
    // Call get all booking api with provided credentials
    const data: any = yield call(getAllBookingsApi, payload)

    // Filter by created by

    // Store bookings data
    yield put(getAllBookingsSuccess(data))
  } catch (err: any) {
    yield put(getAllBookingsFail())
    toast.error(`Get booking failed: ${err.message}`)
  }
}

function* createBookingsWorker(
  action: PayloadAction<CreateBookingPayload>
): Generator<StrictEffect> {
  try {
    // Call create booking login api with provided credentials
    yield call(createBookingApi, action.payload)

    toast.success(`Booking created successfully`)

    yield put(
      getAllBookings({
        user: action.payload.created_by,
      })
    )

    yield put(createBookingSuccess())
    // Callback to parent component when success
    action.payload.onSuccess && action.payload.onSuccess()
  } catch (err: any) {
    yield put(createBookingFail())
    toast.error(`Create booking failed: ${err.message}`)
  }
}

function* bookingSaga() {
  yield all([
    takeLatest(getAllBookings, getBookingsWorker),
    takeLatest(createBooking, createBookingsWorker),
  ])
}

export default bookingSaga
