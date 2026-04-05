import './AnalogClock.css'

interface AnalogClockProps {
  time: Date
}

export function AnalogClock({ time }: AnalogClockProps) {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // Calculate rotation angles
  const hourRotation = (hours % 12) * 30 + minutes * 0.5
  const minuteRotation = minutes * 6 + seconds * 0.1
  const secondRotation = seconds * 6

  return (
    <div className="analog-clock" data-testid="analog-clock">
      <svg viewBox="0 0 200 200" className="clock-face">
        {/* Clock circle */}
        <circle cx="100" cy="100" r="95" className="clock-circle" />
        
        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30
          const x1 = 100 + 80 * Math.sin((angle * Math.PI) / 180)
          const y1 = 100 - 80 * Math.cos((angle * Math.PI) / 180)
          const x2 = 100 + 90 * Math.sin((angle * Math.PI) / 180)
          const y2 = 100 - 90 * Math.cos((angle * Math.PI) / 180)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="hour-marker"
            />
          )
        })}

        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="50"
          className="hour-hand"
          style={{ transform: `rotate(${hourRotation}deg)`, transformOrigin: '100px 100px' }}
        />

        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          className="minute-hand"
          style={{ transform: `rotate(${minuteRotation}deg)`, transformOrigin: '100px 100px' }}
        />

        {/* Second hand */}
        <line
          x1="100"
          y1="115"
          x2="100"
          y2="25"
          className="second-hand"
          style={{ transform: `rotate(${secondRotation}deg)`, transformOrigin: '100px 100px' }}
        />

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" className="center-dot" />
      </svg>
    </div>
  )
}

export default AnalogClock
