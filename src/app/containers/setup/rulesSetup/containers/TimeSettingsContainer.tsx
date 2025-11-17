import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownOption from "../components/DropdownOption";

type TimeSettingsType = {
  name: string;
  durations: string[];
  increments: string[];
};

// TODO: This can be optimised further

const TimeSettings = () => {
  const [selectedCategory, setSelectedCategory] = useState("Blitz");
  const [selectedDuration, setSelectedDuration] = useState("1 Minutes");
  const [selectedIncrement, setSelectedIncrement] = useState("0 Seconds");

  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    name: string;
    open: boolean;
  }>({ name: "", open: false });

  const timeSettingsOptions: TimeSettingsType[] = [
    {
      name: "Blitz",
      durations: ["1 Minutes", "3 Minutes", "5 Minutes"],
      increments: ["0 Seconds", "5 Seconds", "10 Seconds"],
    },
    {
      name: "Rapid",
      durations: ["5 Minutes", "10 Minutes"],
      increments: ["0 Seconds", "10 Seconds", "15 Seconds"],
    },
    {
      name: "Classical",
      durations: ["10 Minutes", "Infinite"],
      increments: ["0 Seconds", "15 Seconds", "Infinite"],
    },
  ];

  const categoryData = timeSettingsOptions.find(
    (option) => option.name === selectedCategory
  );

  const toggleDropdown = (section: string) => {
    setIsDropdownOpen((prev) => ({
      name: section,
      open: prev.name === section ? !prev.open : true,
    }));
  };

  return (
    <div className="flex flex-col items-center w-full md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700 h-[350px]">
      <h2 className="text-2xl font-semibold text-white mb-6">Time Settings</h2>

      {/* CATEGORY */}
      <div className="relative w-full mb-6">
        <div
          className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-lg cursor-pointer"
          onClick={() => toggleDropdown("category")}
        >
          <p>{selectedCategory}</p>
          <ChevronDown
            className="absolute right-4 top-3.5 text-gray-400"
            size={24}
          />
        </div>

        {isDropdownOpen.open && isDropdownOpen.name === "category" && (
          <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
            {timeSettingsOptions.map((option) => (
              <DropdownOption
                key={option.name}
                text={option.name}
                onClick={() => {
                  setSelectedCategory(option.name);
                  setSelectedDuration(option.durations[0]);
                  setSelectedIncrement(option.increments[0]);
                  setIsDropdownOpen({ name: "", open: false });
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* DURATION */}
      <div className="relative w-full mb-6">
        <div
          className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-lg cursor-pointer"
          onClick={() => toggleDropdown("duration")}
        >
          <p>{selectedDuration}</p>
          <ChevronDown
            className="absolute right-4 top-3.5 text-gray-400"
            size={24}
          />
        </div>

        {isDropdownOpen.open &&
          isDropdownOpen.name === "duration" &&
          categoryData && (
            <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
              {categoryData.durations.map((duration) => (
                <DropdownOption
                  key={duration}
                  text={duration}
                  onClick={() => {
                    setSelectedDuration(duration);
                    setIsDropdownOpen({ name: "", open: false });
                  }}
                />
              ))}
            </div>
          )}
      </div>

      {/* INCREMENT */}
      <div className="relative w-full">
        <div
          className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-lg cursor-pointer"
          onClick={() => toggleDropdown("increments")}
        >
          <p>{selectedIncrement}</p>
          <ChevronDown
            className="absolute right-4 top-3.5 text-gray-400"
            size={24}
          />
        </div>

        {isDropdownOpen.open &&
          isDropdownOpen.name === "increments" &&
          categoryData && (
            <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
              {categoryData.increments.map((increment) => (
                <DropdownOption
                  key={increment}
                  text={increment}
                  onClick={() => {
                    setSelectedIncrement(increment);
                    setIsDropdownOpen({ name: "", open: false });
                  }}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default TimeSettings;
