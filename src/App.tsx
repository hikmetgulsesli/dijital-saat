import { useState, useEffect } from 'react';
import { DigitalClock, DateDisplay } from './components';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <DigitalClock time={time} />
      <DateDisplay date={time} />
    </div>
  );
}

export default App;