import { useState, useEffect, ReactNode } from 'react';
import { TimerContext } from './TimerContext';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const totalDuration = 3 * 60 * 60 * 1000; // 3 hours in ms
  const [time, setTime] = useState<number>(totalDuration / 1000);

  useEffect(() => {
    let startTime = localStorage.getItem('startTime');

    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem('startTime', startTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - parseInt(startTime!);
      const remaining = Math.floor((totalDuration - elapsed) / 1000);

      setTime(remaining > 0 ? remaining : 0);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [totalDuration]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <TimerContext.Provider value={{ time, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};
