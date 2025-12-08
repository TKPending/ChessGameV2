import { useState } from "react";
import DropdownContainer from "@/app/containers/gameSettings/containers/DropdownContainer";
import {
  timeSettingsOptions,
  TimeSettingsOptionsType,
} from "@/app/types/ChessTypes";

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

/**
 * Renders the components related to setting the time for the game
 * @param category Category of time (Blitz, Rapid or Classical)
 * @param duration Original time set for the game
 * @param increment The amount of time to be added if increment is allowed
 * @param onChangeCategory Change the category
 * @param onChangeDuration Change the duration amount
 * @param onChangeIncrement Change the increment amount
 * @returns Component for setting the Time Rules
 */
const TimeSettings = ({
  category,
  duration,
  increment,
  onChangeCategory,
  onChangeDuration,
  onChangeIncrement,
}: TimeSettingsProps) => {
  const [open, setOpen] = useState<string | null>(null);

  const categoryData: TimeSettingsOptionsType | undefined =
    timeSettingsOptions.find((option) => option.name === category);

  const toggle = (name: string) =>
    setOpen((prev) => (prev === name ? null : name));

  return (
    <div className="flex flex-col items-center w-full md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700 h-[350px]">
      <h2 className="text-2xl font-semibold text-white mb-6">Time Settings</h2>

      <DropdownContainer
        value={category}
        options={timeSettingsOptions.map((o) => o.name)}
        isOpen={open === "category"}
        onToggle={() => toggle("category")}
        onSelect={(newCategory: string) => {
          const data: TimeSettingsOptionsType = timeSettingsOptions.find(
            (o) => o.name === newCategory
          )!;
          onChangeDuration(data.durations[0]);
          onChangeIncrement(data.increments[0]);
          onChangeCategory(newCategory, data.durations[0], data.increments[0]);
          setOpen(null);
        }}
      />

      {categoryData && (
        <DropdownContainer
          value={duration}
          options={categoryData.durations}
          isOpen={open === "duration"}
          onToggle={() => toggle("duration")}
          onSelect={(newDuration) => {
            onChangeDuration(newDuration);
            setOpen(null);
          }}
        />
      )}

      {duration !== "Infinite" && categoryData && (
        <DropdownContainer
          value={increment}
          options={categoryData.increments}
          isOpen={open === "increment"}
          onToggle={() => toggle("increment")}
          onSelect={(newIncrement) => {
            onChangeIncrement(newIncrement);
            setOpen(null);
          }}
        />
      )}
    </div>
  );
};

export default TimeSettings;
