import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownOption from "../components/DropdownOption";

type TimeSettingsProps = {
  category: string;
  duration: string;
  increment: string;
  onChangeCategory: (
    category: string,
    duration: string,
    increment: string
  ) => void;
  onChangeDuration: (duration: string) => void;
  onChangeIncrement: (increment: string) => void;
};

type Test = {
  name: string;
  durations: string[];
  increments: string[];
};

const timeSettingsOptions: Test[] = [
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

// TODO: This can be optimised further
const TimeSettings = ({
  category,
  duration,
  increment,
  onChangeCategory,
  onChangeDuration,
  onChangeIncrement,
}: TimeSettingsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    name: string;
    open: boolean;
  }>({ name: "", open: false });

  const categoryData = timeSettingsOptions.find(
    (option) => option.name === category
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
          <p>{category}</p>
          <ChevronDown
            className="absolute right-4 top-3.5 text-gray-400"
            size={24}
          />
        </div>

        {isDropdownOpen.open && isDropdownOpen.name === "category" && (
          <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
            {timeSettingsOptions.map((option: Test) => (
              <DropdownOption
                key={option.name}
                text={option.name}
                onClick={() => {
                  onChangeDuration(option.durations[0]);
                  onChangeIncrement(option.increments[0]);
                  onChangeCategory(
                    option.name,
                    option.durations[0],
                    option.increments[0]
                  );
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
          <p>{duration}</p>
          <ChevronDown
            className="absolute right-4 top-3.5 text-gray-400"
            size={24}
          />
        </div>

        {isDropdownOpen.open &&
          isDropdownOpen.name === "duration" &&
          categoryData && (
            <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
              {categoryData.durations.map((duration: string) => (
                <DropdownOption
                  key={duration}
                  text={duration}
                  onClick={() => {
                    onChangeDuration(duration);
                    setIsDropdownOpen({ name: "", open: false });
                  }}
                />
              ))}
            </div>
          )}
      </div>

      {/* INCREMENT */}
      {duration !== "Infinite" && (
        <div className="relative w-full">
          <div
            className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-lg cursor-pointer"
            onClick={() => toggleDropdown("increments")}
          >
            <p>{increment}</p>
            <ChevronDown
              className="absolute right-4 top-3.5 text-gray-400"
              size={24}
            />
          </div>

          {isDropdownOpen.open &&
            isDropdownOpen.name === "increments" &&
            categoryData && (
              <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
                {categoryData.increments.map((increment: string) => (
                  <DropdownOption
                    key={increment}
                    text={increment}
                    onClick={() => {
                      onChangeIncrement(increment);
                      setIsDropdownOpen({ name: "", open: false });
                    }}
                  />
                ))}
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default TimeSettings;
