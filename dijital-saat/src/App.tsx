import { useState, useEffect } from 'react'
import { DigitalClock, AnalogClock, Settings, useClockTypePreference } from './components'
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Saat</h1>
          <Settings clockType={clockType} onClockTypeChange={setClockType} />
        </div>
      </header>

      {/* Sidebar */}
      <aside className="app-sidebar">
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-link ${clockType === 'digital' ? 'active' : ''}`}
            onClick={() => setClockType('digital')}
          >
            <span className="material-symbols-outlined">schedule</span>
            <span>Dijital</span>
          </button>
          <button 
            className={`sidebar-link ${clockType === 'analog' ? 'active' : ''}`}
            onClick={() => setClockType('analog')}
          >
            <span className="material-symbols-outlined">watch</span>
            <span>Analog</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        <div className="clock-view">
          {clockType === 'digital' ? (
            <DigitalClock time={time} />
          ) : (
            <AnalogClock time={time} />
          )}
          <div className="date-display">{formatDate(time)}</div>
        </div>
      </main>

      {/* Footer */}
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
