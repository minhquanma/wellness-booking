import { Booking } from 'features/bookings/booking-types'
import { memo } from 'react'
import {  timestampToString } from 'utils/datetime'
import * as S from './BookingListItem.styled'

type BookingListItemProps = {
  item: Booking
}

const BookingListItem = ({ item }: BookingListItemProps) => {
  return (
    <S.ListItem>
      <div>{item.event_title}</div>
      <div>{item.event_location}</div>
      <div>{ timestampToString(item.confirmed_datetime)}</div>
      <div>{item.created_by}</div>
    </S.ListItem>
  )
}

export default memo(BookingListItem)
