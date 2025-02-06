// TopBar.tsx
import React, { useEffect, useState } from "react";

const TopBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  // Format time (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex justify-between w-full items-center p-4 bg-gray-800 text-white">
      <div className="flex flex-col space-x-4">
        <span>User: John Doe</span>
        <span>Mock Test: JEE Main 2024</span>
      </div>
      <div className="text-xl font-bold">
        Time Left: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TopBar;