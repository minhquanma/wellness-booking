import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { formatTimestamp, formDataToTimestamp } from 'utils/datetime'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'redux/store'
import { createBooking } from 'features/bookings/booking-slice'
import Spinner from 'components/Spinner/Spinner'

type CreateBookingModalProps = {
  onClose: () => void
}

type FormInputs = {
  event_title: string
  event_location: string
  confirmed_date: string
  confirmed_time: string
}

const schema = yup
  .object({
    event_title: yup.string().required('Please enter event title'),
    event_location: yup.string().required('Please enter event location'),
    confirmed_date: yup.string().required('Please select confirmed date'),
    confirmed_time: yup.string().required('Please select confirmed time'),
  })
  .required()

const EVENT_TYPES = ['Health Talk', 'Wellness Events', 'Fitness Activities']

const CreateBookingModal = ({
  onClose = () => {},
}: CreateBookingModalProps) => {
  const auth = useSelector((state: RootState) => state.auth)
  const booking = useSelector((state: RootState) => state.booking)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  })

  function onSubmit(data: FormInputs) {
    // Combine date & time from from data into timestamp and create a new payload object
    const createBookingPayload = {
      event_title: data.event_title,
      event_location: data.event_location,
      confirmed_datetime: formDataToTimestamp(
        data.confirmed_date,
        data.confirmed_time
      ),
      created_at: formatTimestamp(new Date()),
      created_by: auth.user.username,
      onSuccess: () => {
        onClose()
      },
    }

    dispatch(createBooking(createBookingPayload))
  }

  // Use memo with deps = [] to make the event list remain unchanged on re-renders
  const eventTypeOptions = useMemo(
    () =>
      EVENT_TYPES.map((eventName) => (
        <option key={eventName} value={eventName}>
          {eventName}
        </option>
      )),
    []
  )

  const createBookingSpinner = booking.isCreatingBooking && <Spinner />

  return (
    <div>
      <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>

      <div
        id="create-booking-modal"
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            ></button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
                Create booking
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="event-types"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Type of event
                  </label>
                  <select
                    id="event-types"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('event_title')}
                  >
                    {eventTypeOptions}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Location of Event
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter location"
                    {...register('event_location')}
                  />
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.event_location?.message}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Confirm date time
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Select confirm date"
                      {...register('confirmed_date')}
                    />
                    <input
                      type="time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Select confirm date"
                      {...register('confirmed_time')}
                    />
                  </div>
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.confirmed_date?.message}
                  </p>
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.confirmed_time?.message}
                  </p>
                </div>

                <div className="pt-4 flex justify-end items-center space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                  <button
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit(onSubmit)}
                    disabled={booking.isCreatingBooking}
                  >
                    Create booking {createBookingSpinner}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBookingModal
