import AppContainer from 'components/AppContainer/AppContainer'
import BookingCard from 'components/BookingCard/BookingCard'
import Spinner from 'components/Spinner/Spinner'
import { getAllBookings } from 'features/bookings/booking-slice'
import { Booking } from 'features/bookings/booking-types'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'

import * as S from './Dashboard.style'

type DashboardProps = {}


const Dashboard = (props: DashboardProps) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const bookings: Array<Booking> = useSelector(
    (state: RootState) => state.booking.bookings
  )
  const isLoadingBookings = useSelector((state: RootState) => state.booking.isLoading);

  useEffect(() => {
    // Fetch all bookings data on screen mount
    dispatch(
      getAllBookings({
        user: user.username,
      })
    )
  }, [dispatch, user, user.username])

  // 5 latest bookings sort by “created_at” DESCENDING)
  const lastFiveBookings = useMemo(() => {
    // Filter items
    const bookingsCreatedByCurrentUser = bookings.filter(
      (booking) => booking.created_by === user.username
    )

    return bookingsCreatedByCurrentUser.slice(0, 5)
  }, [bookings, user])

  function renderBookingCards() {
    return lastFiveBookings.map((booking) => (
      <BookingCard item={booking} key={booking._id} />
    ))
  }

  const spinner = isLoadingBookings &&  <Spinner size="md" />

  return (
    <AppContainer>
      <S.WelcomeCard>
        <div>
          <h2 className="text-3xl dark:text-white font-semibold mb-3">
            Hi, <S.WelcomeCardName>{user.username}</S.WelcomeCardName>
          </h2>
          <p className="text-xl dark:text-white text-gray-400">
            Have a nice day
          </p>
        </div>
        <S.WelcomeLogo src="/dashboard-logo.png"></S.WelcomeLogo>
      </S.WelcomeCard>
      <S.Heading>
        <h3 className="text-3xl dark:text-white font-medium">Dashboard  {spinner} </h3>
        <p className="text-lg text-gray-500">Latest 5 bookings</p>
     
      </S.Heading>
      <S.BookingGridContainer>{renderBookingCards()}</S.BookingGridContainer>
    </AppContainer>
  )
}

export default Dashboard
