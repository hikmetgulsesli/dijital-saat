import { useState, useEffect } from 'react';
import './DigitalClock.css';

interface DigitalClockProps {
  time?: Date;
}

export function DigitalClock({ time: propTime }: DigitalClockProps) {
  // Use propTime directly if provided, otherwise use local state
  const [localTime, setLocalTime] = useState(() => propTime || new Date());

  // Determine which time to display
  const displayTime = propTime || localTime;

  // Set up interval for live updates (only when no propTime provided)
  useEffect(() => {
    if (propTime) {
      return;
    }

    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [propTime]);

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="digital-clock" data-testid="digital-clock">
      {formatTime(displayTime)}
    </div>
  );
}

export default DigitalClock;