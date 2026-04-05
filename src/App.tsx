import { useState, useEffect } from 'react'
import { AnalogClock, Settings, DigitalClock, DateDisplay, type ClockType } from './components'
import './App.css'

const STORAGE_KEY = 'clock-type-preference'

export function App() {
  const [time, setTime] = useState(new Date())
  const [clockType, setClockType] = useState<ClockType>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return (saved as ClockType) || 'digital'
    }
    return 'digital'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleClockTypeChange = (type: ClockType) => {
    setClockType(type)
    localStorage.setItem(STORAGE_KEY, type)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">Saat</div>
        <Settings clockType={clockType} onClockTypeChange={handleClockTypeChange} />
      </header>

      <main className="app-main">
        <div className="clock-wrapper">
          {clockType === 'digital' ? (
            <DigitalClock time={time} />
          ) : (
            <AnalogClock time={time} />
          )}
        </div>
        <div className="date-wrapper">
          <DateDisplay date={time} />
        </div>
      </main>
    </div>
  )
}

export default App