import { useState, useEffect } from 'react'
import { DigitalClock, AnalogClock, Settings, useClockTypePreference } from './components'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [clockType, setClockType] = useClockTypePreference()
  const [activeNav, setActiveNav] = useState<'clock' | 'settings'>('clock')

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
          <nav className="header-nav">
            <a 
              href="#" 
              className={`nav-link ${activeNav === 'clock' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveNav('clock') }}
            >
              Saat
            </a>
            <a 
              href="#" 
              className={`nav-link ${activeNav === 'settings' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveNav('settings') }}
            >
              Ayarlar
            </a>
          </nav>
          <Settings clockType={clockType} onClockTypeChange={setClockType} />
        </div>
      </header>

      {/* Sidebar */}
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
          <a 
            href="#" 
            className="sidebar-link"
            onClick={(e) => { e.preventDefault(); setActiveNav('settings') }}
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Ayarlar</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        {activeNav === 'settings' ? (
          <div className="settings-view">
            <h2>Ayarlar</h2>
            <div className="setting-section">
              <span className="setting-title">Saat Görünümü</span>
              <div className="toggle-row">
                <button
                  className={`toggle-btn ${clockType === 'digital' ? 'active' : ''}`}
                  onClick={() => setClockType('digital')}
                >
                  Dijital
                </button>
                <button
                  className={`toggle-btn ${clockType === 'analog' ? 'active' : ''}`}
                  onClick={() => setClockType('analog')}
                >
                  Analog
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="clock-view">
            {clockType === 'digital' ? (
              <DigitalClock time={time} />
            ) : (
              <AnalogClock time={time} />
            )}
            <div className="date-display">{formatDate(time)}</div>
          </div>
        )}
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
