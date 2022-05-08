import { format } from 'date-fns'

export function formatTimestamp(data: Date) {
  try {
    return format(data, "yyyy-MM-dd'T'HH:mm:ss")
  } catch (err) {
    return 'Not available'
  }
}
// Merge and convert the input form data to server timestamp
export function formDataToTimestamp(date: string, time: string) {
  const dateTime = new Date(`${date} ${time}`)

  return formatTimestamp(dateTime)
}

// Convert the timestamp value to display string
export function timestampToString(timestamp: string) {
    try {
        const date = new Date(timestamp)
        return format(date, " HH:mm | yyyy-MMM-dd")
      } catch (err) {
        return 'Not available'
      }
}
