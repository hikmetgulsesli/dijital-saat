import { useState, useEffect } from 'react'
import { AnalogClock } from './components/AnalogClock'
import { Settings } from './components/Settings'
import './App.css'

type ClockType = 'digital' | 'analog'

const STORAGE_KEY = 'dijital-saat-clock-type'

function App() {
  const [time, setTime] = useState(new Date())
  const [clockType, setClockType] = useState<ClockType>('digital')
  const [mounted, setMounted] = useState(false)

  // Load preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'digital' || saved === 'analog') {
      setClockType(saved)
    }
    setMounted(true)
  }, [])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Save preference when changed
  const handleClockTypeChange = (type: ClockType) => {
    localStorage.setItem(STORAGE_KEY, type)
    setClockType(type)
  }

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  // Format date in Turkish
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleDateString('tr-TR', options)
  }

  if (!mounted) {
    return (
      <div className="container">
        <div className="loading">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="header">
        <div className="app-title">TEMPORAL</div>
        <Settings clockType={clockType} onClockTypeChange={handleClockTypeChange} />
      </header>

      <main className="main">
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

      <nav className="bottom-nav">
        <button
          className={`nav-button ${clockType === 'digital' ? 'active' : ''}`}
          onClick={() => handleClockTypeChange('digital')}
        >
          <span className="material-symbols-outlined">schedule</span>
          <span>Dijital</span>
        </button>
        <button
          className={`nav-button ${clockType === 'analog' ? 'active' : ''}`}
          onClick={() => handleClockTypeChange('analog')}
        >
          <span className="material-symbols-outlined">watch</span>
          <span>Analog</span>
        </button>
      </nav>
    </div>
  )
}

export default App
