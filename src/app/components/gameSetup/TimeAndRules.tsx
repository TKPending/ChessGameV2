import { useEffect, useState } from "react";
import TimeOption from "./TimeOption";
import CustomTimes from "./CustomTimes";

const SAME = false;
const SEPERATE = true;

type TimeOptions = {
  time: string;
  actualTime: number | number[];
  isPressed: boolean;
};

const TimeAndRules = () => {
  const [timeRegulation, setTimeRegulation] = useState<boolean>(SAME);
  const [timeOptions, setTimeOptions] = useState<TimeOptions[]>([
    { time: "Blitz", actualTime: 180, isPressed: true },
    { time: "Rapid", actualTime: 600, isPressed: false },
    { time: "No Timer", actualTime: 0, isPressed: false },
    { time: "Custom", actualTime: [0, 0], isPressed: false },
  ]);
  const [activeTimeOption, setActiveTimeOption] = useState("Blitz");

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
    <div className="flex flex-col items-center gap-4 text-white font-semibold">
      <p>Time and Rules</p>

      <div className="flex gap-2 items-center justify-center">
        <p
          onClick={() => handleTimeRegulation(SAME)}
          className={`cursor-pointer hover:underline ${timeRegulation === SAME && "underline"}`}
        >
          Same Time
        </p>
        <p>/</p>
        <p
          onClick={() => handleTimeRegulation(SEPERATE)}
          className={`cursor-pointer hover:underline ${timeRegulation === SEPERATE && "underline"}`}
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
