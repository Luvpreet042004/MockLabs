import { useState, useEffect, ReactNode } from 'react';
import { TimerContext } from './TimerContext';

// Create the Timer Context

// Timer Provider Component
export const TimerProvider = ({ children }: { children: ReactNode }) => {
  // Initialize time from localStorage or default to 3 hours (in seconds)
  const [time, setTime] = useState<number>(() => {
    const savedTime = localStorage.getItem('timer');
    return savedTime ? parseInt(savedTime, 10) : 3 * 60 * 60;
  });

  // Save time to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('timer', time.toString());
  }, [time]);

  // Update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrement time every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Format time into HH:MM:SS
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