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

  return (
    <div className="analog-clock" data-testid="analog-clock">
      <div className="clock-face">
        {/* Outer Ring */}
        <div className="clock-ring"></div>
        
        {/* Hour Markers */}
        <div className="hour-marker marker-12">12</div>
        <div className="hour-marker marker-3">03</div>
        <div className="hour-marker marker-6">06</div>
        <div className="hour-marker marker-9">09</div>
        
        {/* SVG Clock Face */}
        <svg className="clock-svg" viewBox="0 0 100 100">
          {/* Minute Markers */}
          <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.2">
            {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
              <line
                key={angle}
                x1="50"
                x2="50"
                y1="2"
                y2="5"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </g>
          
          {/* Hour Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="square"
            transform={`rotate(${hourAngle} 50 50)`}
          />
          
          {/* Minute Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="square"
            transform={`rotate(${minuteAngle} 50 50)`}
          />
          
          {/* Second Hand */}
          <line
            x1="50"
            y1="58"
            x2="50"
            y2="8"
            stroke="#ffb4ab"
            strokeWidth="0.5"
            strokeLinecap="square"
            transform={`rotate(${secondAngle} 50 50)`}
          />
          
          {/* Center Cap */}
          <circle cx="50" cy="50" r="1.5" fill="white" />
          <circle cx="50" cy="50" r="0.5" fill="black" />
        </svg>
      </div>
    </div>
  )
}

export default AnalogClock
