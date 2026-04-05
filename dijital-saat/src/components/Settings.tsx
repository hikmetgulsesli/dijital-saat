import { useState, useEffect } from 'react'
import './Settings.css'

export type ClockType = 'digital' | 'analog'

interface SettingsProps {
  clockType: ClockType
  onClockTypeChange: (type: ClockType) => void
}

export function Settings({ clockType, onClockTypeChange }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSettings = () => {
    setIsOpen(!isOpen)
  }

  const handleClockTypeChange = (type: ClockType) => {
    onClockTypeChange(type)
    setIsOpen(false)
  }

  return (
    <div className="settings">
      <button 
        className="settings-button"
        onClick={toggleSettings}
        aria-label="Ayarlar"
      >
        <span className="material-symbols-outlined">settings</span>
      </button>
      
      {isOpen && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Ayarlar</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Kapat"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="settings-content">
            <div className="setting-item">
              <span className="setting-label">Saat Görünümü</span>
              <div className="toggle-group">
                <button
                  className={`toggle-button ${clockType === 'digital' ? 'active' : ''}`}
                  onClick={() => handleClockTypeChange('digital')}
                >
                  Dijital Görünüm
                </button>
                <button
                  className={`toggle-button ${clockType === 'analog' ? 'active' : ''}`}
                  onClick={() => handleClockTypeChange('analog')}
                >
                  Analog Görünüm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="settings-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

const STORAGE_KEY = 'dijital-saat-clock-type'

export function useClockTypePreference(): [ClockType, (type: ClockType) => void] {
  const [clockType, setClockType] = useState<ClockType>(() => {
    if (typeof window === 'undefined') return 'digital'
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'analog' || stored === 'digital') {
        return stored
      }
    } catch {
      // localStorage not available
    }
    return 'digital'
  })

  const setClockTypeWithStorage = (type: ClockType) => {
    setClockType(type)
    try {
      localStorage.setItem(STORAGE_KEY, type)
    } catch {
      // localStorage not available
    }
  }

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'digital' || e.newValue === 'analog')) {
        setClockType(e.newValue)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return [clockType, setClockTypeWithStorage]
}
