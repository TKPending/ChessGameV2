import { useEffect, useState } from "react";
import TimeOption from "./TimeOption";
import CustomTimes from "./CustomTimes";

const SAME = false;
const SEPERATE = true;

type TimeOptions = {
  time: string;
  isPressed: boolean;
};

const TimeAndRules = () => {
  const [timeRegulation, setTimeRegulation] = useState<boolean>(SAME);
  const [timeOptions, setTimeOptions] = useState<TimeOptions[]>([
    { time: "Blitz", isPressed: true },
    { time: "Rapid", isPressed: false },
    { time: "No Timer", isPressed: false },
    { time: "Custom", isPressed: false },
  ]);
  const [activeTimeOption, setActiveTimeOption] = useState("Blitz");

  console.log(timeRegulation);

  const handleTimeRegulation = (regulation: boolean) => {
    setTimeRegulation(regulation);
  };

  const handleTimePressed = (index: number) => {
    setTimeOptions((prevState) =>
      prevState.map((option, i) =>
        i === index
          ? { ...option, isPressed: true }
          : { ...option, isPressed: false }
      )
    );
    setActiveTimeOption(timeOptions[index].time);
    // Dispatch?
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Time and Rules</p>

      <div className="flex gap-2 items-center justify-center">
        <p
          onClick={() => handleTimeRegulation(SAME)}
          className="cursor-pointer hover:underline"
        >
          Same Time
        </p>
        <p>/</p>
        <p
          onClick={() => handleTimeRegulation(SEPERATE)}
          className="cursor-pointer hover:underline"
        >
          Separate Times
        </p>
      </div>

      {!timeRegulation && (
        <div className="flex gap-6 w-full ">
          {timeOptions.map((option: TimeOptions, index: number) => (
            <TimeOption
              key={index}
              timeOption={option.time}
              isPressed={option.isPressed}
              onClick={() => handleTimePressed(index)}
            />
          ))}
        </div>
      )}

      {(timeRegulation || activeTimeOption === "Custom") && <CustomTimes />}
    </div>
  );
};

export default TimeAndRules;
