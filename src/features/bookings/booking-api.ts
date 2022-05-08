import axiosInstance from 'utils/api-service'
import { CreateBookingPayload, GetBookingPayload } from './booking-types'

const GET_BOOKING_API_URL =
  'https://u7b754tqv4.execute-api.ap-southeast-1.amazonaws.com/default/DeveloperTest_GetBookings'

const CREATE_BOOKING_API_URL =
  'https://d0irjg216a.execute-api.ap-southeast-1.amazonaws.com/default/DeveloperTest_CreateBooking'

export async function getAllBookingsApi(payload: GetBookingPayload) {
  return await axiosInstance.post(GET_BOOKING_API_URL, payload)
}

export async function createBookingApi(payload: CreateBookingPayload) {
  return await axiosInstance.post(CREATE_BOOKING_API_URL, payload)
}
