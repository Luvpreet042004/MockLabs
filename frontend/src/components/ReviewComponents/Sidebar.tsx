import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import QuestionGrid from "./QuestionGrid";
import ColorCode from "./ColorCOde";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`fixed z-10 h-full transition-all duration-300 ${
        isOpen ? "w-80" : "w-0"
      }`}
    >
      {/* Toggle Button */} 
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 transform items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 shadow-lg ring-2 ring-teal-500/20 transition-all hover:scale-110 hover:from-teal-500 hover:to-cyan-400 hover:ring-teal-500/40 hover:shadow-xl"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <ChevronLeft size={18} className="text-white" />
        ) : (
          <ChevronRight size={18} className="text-white animate-bounce" />
        )}
      </button>

      {/* Sidebar Content */}
      <div
        className={`h-full overflow-hidden bg-gradient-to-br from-black via-slate-800 to-black shadow-2xl transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header Section */}
          <div className="border-b border-teal-800/50 p-4 bg-slate-900/30">
            <h2 className="text-lg font-bold text-teal-300 mb-2">Exam Navigator</h2>
            <ColorCode />
          </div>

          {/* Questions Grid Section */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-teal-600/80 hover:scrollbar-thumb-teal-500">
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-teal-400/80 mb-3">
                Question Palette
              </div>
              <QuestionGrid />
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-white text-center border-t border-teal-800/50 bg-slate-900/30">
            All the Best!!!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;