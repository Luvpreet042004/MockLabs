import React from "react";


const ColorCode : React.FC =()=>{
    return(
        <div className="grid grid-cols-2  space-y-2">
        {/* Not Visited */}
        <div className="flex items-center space-x-2">
          <div className="p-4 text-black rounded bg-gray-200">70</div>
          <span>Not Visited</span>
        </div>

        {/* Marked for Review */}
        <div className="flex items-center space-x-2">
          <div className="p-4 text-black rounded bg-yellow-300">70</div>
          <span>Marked for Review</span>
        </div>

        {/* Not Attempted */}
        <div className="flex items-center space-x-2">
          <div className="p-4 text-black rounded bg-red-400">70</div>
          <span>Not Attempted</span>
        </div>

        {/* Answered */}
        <div className="flex items-center space-x-2">
          <div className="p-4 text-black rounded bg-green-300">70</div>
          <span>Answered</span>
        </div>
      </div>
    )
}

export default ColorCode;