import { useState, useEffect } from 'react'
import { AnalogClock, Settings, useClockTypePreference } from './components'
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
        <div className="header-content">
          <nav className="header-nav">
            <a href="#" className="nav-link active">Saat</a>
            <a href="#" className="nav-link">Ayarlar</a>
          </nav>
        </div>
      </header>

      <aside className="app-sidebar">
        <nav className="sidebar-nav">
          <a 
            href="#" 
            className={`sidebar-link ${clockType === 'digital' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setClockType('digital') }}
          >
            <span className="material-symbols-outlined">schedule</span>
            <span>Dijital</span>
          </a>
          <a 
            href="#" 
            className={`sidebar-link ${clockType === 'analog' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setClockType('analog') }}
          >
            <span className="material-symbols-outlined">watch</span>
            <span>Analog</span>
          </a>
        </nav>
      </aside>

      <main className="app-main">
        {clockType === 'digital' ? (
          <div className="digital-view">
            <div className="time-display">{formatTime(time)}</div>
            <div className="date-display">{formatDate(time)}</div>
          </div>
        ) : (
          <div className="analog-view">
            <AnalogClock time={time} />
            <div className="digital-sync">{formatTime(time)}</div>
            <div className="date-display">{formatDate(time)}</div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <span>{time.toLocaleDateString('tr-TR', { weekday: 'long' }).toUpperCase()}</span>
          <span>{time.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</span>
        </div>
      </footer>
    </div>
  )
}

export default App
