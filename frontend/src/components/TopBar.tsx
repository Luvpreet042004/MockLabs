// TopBar.tsx
import React, { useEffect, useState } from "react";
import { UserIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";

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
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg sticky top-0 z-10">
  <div className="flex items-center gap-4">
    <div className="p-2 bg-white/10 rounded-lg">
      <UserIcon className="h-6 w-6" />
    </div>
    <div className="flex flex-col">
      <span className="font-semibold">John Doe</span>
      <span className="text-sm text-gray-300">JEE Main 2024 - Mock Test</span>
    </div>
  </div>
  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
    <ClockIcon className="h-5 w-5" />
    <span className="font-mono text-lg font-bold tracking-wider">
      {formatTime(timeLeft)}
    </span>
  </div>
</div>
  );
};

export default TopBar;