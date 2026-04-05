import { useState, useEffect } from 'react'
import { AnalogClock } from './components/AnalogClock'
import { Settings, useClockTypePreference } from './components/Settings'
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { hour12: false })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">Saat</div>
        <Settings clockType={clockType} onClockTypeChange={setClockType} />
      </header>

      <main className="app-main">
        {clockType === 'digital' ? (
          <div className="digital-clock">
            <div className="time">{formatTime(time)}</div>
            <div className="date">{formatDate(time)}</div>
          </div>
        ) : (
          <div className="analog-clock-wrapper">
            <AnalogClock time={time} />
            <div className="date">{formatDate(time)}</div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
