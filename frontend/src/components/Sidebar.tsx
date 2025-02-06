import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuestionGrid from "./QuestionGrid";
import ColorCode from "./ColorCOde";

const Sidebar : React.FC =()=> {
  const [isOpen, setIsOpen] = useState(true);

  return (
      <div
        className={` text-white transition-all duration-300 ${
          isOpen ? "w-86" : "w-0"
        } flex flex-col relative`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-75 -right-5 bg-gray-800 text-white p-1 rounded-full shadow-md"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Sidebar Content */}
        <div className={`h-screen ${isOpen ? 'grid grid-rows-10' : 'hidden'}`}>
      {/* First section - spans 4 rows */}
      <div className="row-span-2 bg-gray-800 text-white flex items-center justify-center">

        <ColorCode />
  </div>

  {/* Second section - spans 6 rows and allows scrolling */}
  <div className="row-span-8 bg-gray-800 text-black overflow-auto">
    <QuestionGrid />
  </div>
</div>
      </div>
  );
}

export default Sidebar;