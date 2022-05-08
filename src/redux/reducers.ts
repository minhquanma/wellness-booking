import authSlice from 'features/auth/auth-slice'
import bookingSlice from 'features/bookings/booking-slice'

const reducer = {
  auth: authSlice,
  booking: bookingSlice
}

export default reducer
