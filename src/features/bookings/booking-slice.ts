import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Booking,
  CreateBookingPayload,
  GetBookingPayload,
} from './booking-types'

const bookingSlice = createSlice({
  name: 'auth',
  initialState: {
    bookings: [] as Booking[],
    isLoading: false,
    isError: false,
    isCreatingBooking: false,
  },
  reducers: {
    getAllBookings: (state, action: PayloadAction<GetBookingPayload>) => {
      state.isLoading = true
    },
    getAllBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload
      state.isLoading = false
    },
    getAllBookingsFail: (state) => {
      state.isLoading = false
      state.isError = true
    },
    createBooking: (state, action: PayloadAction<CreateBookingPayload>) => {
      state.isCreatingBooking = true
    },
    createBookingSuccess: (state) => {
      state.isCreatingBooking = false
    },
    createBookingFail: (state) => {
      state.isCreatingBooking = false
    },
  },
})

export const {
  getAllBookings,
  getAllBookingsSuccess,
  getAllBookingsFail,
  createBooking,
  createBookingSuccess,
  createBookingFail,
} = bookingSlice.actions
export default bookingSlice.reducer
