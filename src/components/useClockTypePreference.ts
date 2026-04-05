import { useState, useEffect } from 'react'
import type { ClockType } from './Settings'

const STORAGE_KEY = 'clock-type-preference'

export function useClockTypePreference(): [ClockType, (type: ClockType) => void] {
  const [clockType, setClockType] = useState<ClockType>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return (saved as ClockType) || 'digital'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, clockType)
  }, [clockType])

  return [clockType, setClockType]
}
