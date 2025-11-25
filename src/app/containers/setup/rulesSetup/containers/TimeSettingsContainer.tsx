import { useState } from "react";
import Dropdown from "@/app/containers/setup/rulesSetup/components/Dropdown";
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

// TODO: This can be optimised further
const TimeSettings = ({
  category,
  duration,
  increment,
  onChangeCategory,
  onChangeDuration,
  onChangeIncrement,
}: TimeSettingsProps) => {
  const [open, setOpen] = useState<string | null>(null);

  const categoryData = timeSettingsOptions.find(
    (option) => option.name === category
  );

  const toggle = (name: string) =>
    setOpen((prev) => (prev === name ? null : name));

  return (
    <div className="flex flex-col items-center w-full md:w-1/2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700 h-[350px]">
      <h2 className="text-2xl font-semibold text-white mb-6">Time Settings</h2>

      <Dropdown
        label="Category"
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
        <Dropdown
          label="Duration"
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
        <Dropdown
          label="Increment"
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
