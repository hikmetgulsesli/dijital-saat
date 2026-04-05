import './AnalogClock.css'

interface AnalogClockProps {
  time: Date
}

export function AnalogClock({ time }: AnalogClockProps) {
  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours()

  // Calculate angles
  const secondAngle = seconds * 6 // 360 / 60 = 6 degrees per second
  const minuteAngle = minutes * 6 + seconds * 0.1 // 6 degrees per minute + smooth movement
  const hourAngle = (hours % 12) * 30 + minutes * 0.5 // 30 degrees per hour + smooth movement

  // Generate hour markers
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30
    const isQuarter = i % 3 === 0
    const length = isQuarter ? 12 : 8
    const width = isQuarter ? 3 : 1
    const x1 = 100 + 75 * Math.cos((angle - 90) * Math.PI / 180)
    const y1 = 100 + 75 * Math.sin((angle - 90) * Math.PI / 180)
    const x2 = 100 + (75 - length) * Math.cos((angle - 90) * Math.PI / 180)
    const y2 = 100 + (75 - length) * Math.sin((angle - 90) * Math.PI / 180)
    
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-primary)"
        strokeWidth={width}
        strokeLinecap="round"
        opacity={isQuarter ? 1 : 0.6}
      />
    )
  })

  return (
    <div className="analog-clock">
      <svg viewBox="0 0 200 200" className="clock-svg">
        {/* Clock face background */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          opacity="0.3"
        />
        
        {/* Inner circle */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="var(--color-surface)"
          stroke="none"
        />
        
        {/* Hour markers */}
        {hourMarkers}
        
        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 50 * Math.cos((hourAngle - 90) * Math.PI / 180)}
          y2={100 + 50 * Math.sin((hourAngle - 90) * Math.PI / 180)}
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2={100 + 70 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
          y2={100 + 70 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
          stroke="var(--color-secondary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Second hand */}
        <line
          x1="100"
          y1="115"
          x2={100 + 75 * Math.cos((secondAngle - 90) * Math.PI / 180)}
          y2={100 + 75 * Math.sin((secondAngle - 90) * Math.PI / 180)}
          stroke="var(--color-error)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle
          cx="100"
          cy="100"
          r="5"
          fill="var(--color-primary)"
        />
        
        {/* Second hand center */}
        <circle
          cx="100"
          cy="100"
          r="2"
          fill="var(--color-error)"
        />
      </svg>
    </div>
  )
}
