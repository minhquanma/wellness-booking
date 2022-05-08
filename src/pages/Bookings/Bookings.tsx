import AppContainer from 'components/AppContainer/AppContainer'
import BookingListItem from 'components/BookingListItem/BookingListItem'
import Spinner from 'components/Spinner/Spinner'
import { getAllBookings } from 'features/bookings/booking-slice'
import { Booking } from 'features/bookings/booking-types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import * as S from './Bookings.style'

type BookingProps = {}

const Bookings = (props: BookingProps) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const bookings: Array<Booking> = useSelector(
    (state: RootState) => state.booking.bookings
  )
  const isLoadingBookings = useSelector(
    (state: RootState) => state.booking.isLoading
  )

  useEffect(() => {
    // Fetch all bookings data on screen mount
    dispatch(
      getAllBookings({
        user: user.username,
      })
    )
  }, [dispatch, user.username])

  function renderBookings() {
    return bookings.map((item) => (
      <BookingListItem key={item._id} item={item}></BookingListItem>
    ))
  }

  const spinner = isLoadingBookings && <Spinner size="md" />

  return (
    <AppContainer>
      <S.Heading>
        <h3 className="text-3xl dark:text-white font-medium">
          All bookings {spinner}
        </h3>
        <p className="text-lg text-gray-500">Created by {user.username}</p>
      </S.Heading>
      <S.ListHeader>
        <S.ListHeaderLabel>Event Title</S.ListHeaderLabel>
        <S.ListHeaderLabel>Event Location</S.ListHeaderLabel>
        <S.ListHeaderLabel>Confirmed Datetime</S.ListHeaderLabel>
        <S.ListHeaderLabel>Created By</S.ListHeaderLabel>
      </S.ListHeader>
      {renderBookings()}
    </AppContainer>
  )
}

export default Bookings
