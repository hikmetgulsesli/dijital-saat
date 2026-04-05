import { useState, useEffect } from 'react';
import { DigitalClock, AnalogClock, Settings, useClockTypePreference } from './components';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [clockType, setClockType] = useClockTypePreference();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      </main>

      <nav className="app-nav">
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">alarm</span>
          <span className="nav-label">Alarm</span>
        </a>
        <a href="#" className="nav-item active">
          <span className="material-symbols-outlined">public</span>
          <span className="nav-label">Dünya Saati</span>
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">timer</span>
          <span className="nav-label">Kronometre</span>
        </a>
        <a href="#" className="nav-item">
          <span className="material-symbols-outlined">hourglass_empty</span>
          <span className="nav-label">Zamanlayıcı</span>
        </a>
      </nav>
    </div>
  );
}

export default App;
