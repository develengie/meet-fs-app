import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru'

dayjs.extend(relativeTime)
dayjs.locale('ru')

export const displayDate = (dateStr: string) => {
  const date = dayjs(dateStr)
  const now = dayjs()

  if (now.diff(date, 'minute') < 30) return date.fromNow()
  if (now.isSame(date, 'day')) return date.format('HH:mm')
  if (now.isSame(date, 'year')) return date.format('D MMMM')

  return date.format('YYYY.MM.DD')
}
