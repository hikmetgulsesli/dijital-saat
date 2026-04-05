import './Settings.css'

export type ClockType = 'digital' | 'analog'

interface SettingsProps {
  clockType: ClockType
  onClockTypeChange: (type: ClockType) => void
}

export function Settings({ clockType, onClockTypeChange }: SettingsProps) {
  return (
    <div className="settings-panel" data-testid="settings-panel">
      <div className="setting-section">
        <span className="setting-title">Saat Görünümü</span>
        <div className="toggle-row">
          <button
            className={`toggle-btn ${clockType === 'digital' ? 'active' : ''}`}
            onClick={() => onClockTypeChange('digital')}
            data-testid="digital-btn"
          >
            Dijital
          </button>
          <button
            className={`toggle-btn ${clockType === 'analog' ? 'active' : ''}`}
            onClick={() => onClockTypeChange('analog')}
            data-testid="analog-btn"
          >
            Analog
          </button>
        </div>
      </div>
    </div>
  )
}

export function useClockTypePreference(): [ClockType, (type: ClockType) => void] {
  const [clockType, setClockType] = useState<ClockType>('digital')
  
  useEffect(() => {
    const saved = localStorage.getItem('clock-type') as ClockType
    if (saved && (saved === 'digital' || saved === 'analog')) {
      setClockType(saved)
    }
  }, [])
  
  const handleChange = (type: ClockType) => {
    setClockType(type)
    localStorage.setItem('clock-type', type)
  }
  
  return [clockType, handleChange]
}

import { useState, useEffect } from 'react'
