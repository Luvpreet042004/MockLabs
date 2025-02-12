// TopBar.tsx
import React from "react";
import { UserIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";
import { useTimer } from "@/context/TimerContext";
import { useParams } from "react-router-dom";

const TopBar: React.FC = () => {
  const {time,formatTime} = useTimer();
  const userImage = localStorage.getItem("userPhoto");
  const userName = localStorage.getItem("userName");
  const {paper} = useParams<{paper: string}>()
  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg sticky top-0 z-10">
  <div className="flex items-center gap-4">
    <div className="p-2 bg-white/10 rounded-lg">
    {userImage ? (
            <img
              src={userImage}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="h-6 w-6" />
          )}
    </div>
    <div className="flex flex-col">
      <span className="font-semibold">{userName}</span>
      <span className="text-sm text-gray-300">JEE Main - {paper}</span>
    </div>
  </div>
  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full">
    <ClockIcon className="h-5 w-5" />
    <span className="font-mono text-lg font-bold tracking-wider">
      {formatTime(time)}
    </span>
  </div>
</div>
  );
};

export default TopBar;