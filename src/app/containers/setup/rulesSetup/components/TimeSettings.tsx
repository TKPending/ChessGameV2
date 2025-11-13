import { ChevronDown } from "lucide-react";

const TimeSettings = () => {
  return (
    <div
      className="flex flex-col items-center justify-start w-full md:w-1/2
                 bg-gradient-to-br from-gray-800 to-gray-900
                 rounded-2xl shadow-xl p-8 border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Time Settings</h2>

      {/* Category Dropdown */}
      <div className="relative w-full mb-6">
        <select
          className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg
                     text-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
        >
          <option value="blitz">Blitz</option>
          <option value="rapid">Rapid</option>
          <option value="classical">Classical</option>
          <option value="custom">Custom</option>
        </select>
        <ChevronDown
          className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
          size={24}
        />
      </div>

      {/* Duration Dropdown */}
      <div className="relative w-full">
        <select
          className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg
                     text-lg focus:ring-2 focus:ring-customGreen focus:outline-none"
        >
          <option value="1">1 Minute</option>
          <option value="3">3 Minutes</option>
          <option value="5">5 Minutes</option>
          <option value="10">10 Minutes</option>
          <option value="custom">Custom</option>
        </select>
        <ChevronDown
          className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
          size={24}
        />
      </div>
    </div>
  );
};

export default TimeSettings;
