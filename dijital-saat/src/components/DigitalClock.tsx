import './DigitalClock.css'

interface DigitalClockProps {
  time: Date
}

export function DigitalClock({ time }: DigitalClockProps) {
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('tr-TR', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="digital-clock" data-testid="digital-clock">
      <div className="time-display">{formatTime(time)}</div>
    </div>
  )
}

export default DigitalClock
