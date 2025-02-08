// TopBar.tsx
import React from "react";
import { UserIcon } from "lucide-react";
import { HomeIcon } from "lucide-react";
import {  useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const homeHandler =()=>{
    navigate('/dashboard',{ replace: true });
      window.history.pushState(null,'/dashboard/')
  }
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
  <div className="flex items-center gap-3 bg-white/10 px-4 py-2 hover:cursor-pointer rounded-full">
    <HomeIcon onClick={()=>homeHandler()} className="h-5 w-5" />
  </div>
</div>
  );
};

export default TopBar;