import './DateDisplay.css'

interface DateDisplayProps {
  date?: Date
}

const turkishDays: string[] = [
  'Pazar',
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
]

const turkishMonths: string[] = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

export function DateDisplay({ date: propDate }: DateDisplayProps) {
  const date = propDate || new Date()

  const formatDate = (d: Date): string => {
    const day = d.getDate()
    const month = turkishMonths[d.getMonth()]
    const year = d.getFullYear()
    const weekday = turkishDays[d.getDay()]
    return `${day} ${month} ${year}, ${weekday}`
  }

  return (
    <div className="date-display" data-testid="date-display">
      {formatDate(date)}
    </div>
  )
}

export default DateDisplay
