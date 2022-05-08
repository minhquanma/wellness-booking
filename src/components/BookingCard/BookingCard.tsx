import { Booking } from 'features/bookings/booking-types'
import * as S from './BookingCard.style'
import { memo } from 'react'
import { timestampToString } from 'utils/datetime'

type BookingCardProps = {
  item: Booking
}

const BookingCard = ({ item }: BookingCardProps) => {
  return (
    <S.Card>
      <S.Header></S.Header>
      <S.Body>
        <S.EventTitle>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.event_title}
          </h5>
        </S.EventTitle>
        <S.EventLocation>
          <p className="text-sm font-semibold">Location</p>
          <S.EventLocationText>{item.event_location}</S.EventLocationText>
        </S.EventLocation>
        <S.CreationInfo>
          <figcaption className="flex items-center space-x-4 text-xs">
            <img
              src="./avatar.jpg"
              alt=""
              className="flex-none w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <div className="flex-auto">
              <div className="mt-0.5 text-gray-600">Created by</div>
              <div className=" text-slate-900 font-semibold dark:text-slate-300">
                {item.created_by}
              </div>
            </div>
            <div className="flex-auto">
              <div className="mt-0.5 text-gray-600">Confirmed date</div>
              <div className=" text-slate-900 font-semibold dark:text-slate-300">
                {timestampToString(item.confirmed_datetime)}
              </div>
            </div>
          </figcaption>
        </S.CreationInfo>
      </S.Body>
    </S.Card>
  )
}

export default memo(BookingCard)
