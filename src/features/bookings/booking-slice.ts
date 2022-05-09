import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Booking,
  CreateBookingPayload,
  GetBookingPayload,
} from './booking-types'

function sortBookingByDateDescending(a: Booking, b: Booking) {
  return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
}

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
      // Create a copy of the original list because sort fn is mutating the list
      const sortedBookings = [...action.payload].sort(
        sortBookingByDateDescending
      )
      state.bookings = sortedBookings
      state.isLoading = false
    },
    getAllBookingsFail: (state) => {
      state.isLoading = false
      state.isError = true
    },
    clearAllBookings: (state) => {
      state.bookings = []
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
  clearAllBookings,
  createBooking,
  createBookingSuccess,
  createBookingFail,
} = bookingSlice.actions
export default bookingSlice.reducer
