export type GetBookingPayload = {
  user: string
}

export type Booking = {
  _id: string
  event_title: string
  event_location: string
  confirmed_datetime: string
  created_at: string
  created_by: string
}

export type CreateBookingPayload = {
  event_title: string
  event_location: string
  confirmed_datetime: string
  created_at: string
  created_by: string
  onSuccess?: () => void;
}
