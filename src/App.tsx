import { useState, useEffect } from 'react'
import { DigitalClock, AnalogClock, Settings, DateDisplay, useClockTypePreference } from './components'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [clockType, setClockType] = useClockTypePreference()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">Saat</div>
        <Settings clockType={clockType} onClockTypeChange={setClockType} />
      </header>

      <main className="app-main">
        {clockType === 'digital' ? (
          <DigitalClock time={time} />
        ) : (
          <div className="analog-clock-wrapper">
            <AnalogClock time={time} />
          </div>
        )}
        <div className="date-display-wrapper">
          <DateDisplay date={time} />
        </div>
      </main>
    </div>
  )
}

export default App