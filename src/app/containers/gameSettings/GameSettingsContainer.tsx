import { useState } from "react";
import StartGameButton from "./components/StartGameButton";
import TimeSettings from "./containers/TimeSettingsContainer";
import UndoOptionSlider from "./components/UndoOptionSlider";

type GameSettingsType = {
  category: string; // Blitz, Rapid, Classical
  duration: string; // Mins in the game
  increment: string; // Increment time amount
  undoAllowed: boolean; // Is Undo allowed
};

/**
 * Returns the content shown on the 'GameSettingsPage'
 * @returns Time Settings, Undo, Start Game Components
 */
const GameSettingsContainer = () => {
  const [gameSettings, setGameSettings] = useState<GameSettingsType>({
    category: "Blitz",
    duration: "1 Minutes",
    increment: "0 Seconds",
    undoAllowed: false,
  });

  return (
    <div className="h-full overscroll-none flex flex-col items-center justify-center w-full gap-12 py-16">
      <h1 className="text-4xl font-bold text-customGreen text-center">
        Game Settings
      </h1>

      <div className="flex flex-col items-center justify-center gap-10 w-3/4 md:w-full max-w-4xl">
        <TimeSettings
          category={gameSettings.category}
          duration={gameSettings.duration}
          increment={gameSettings.increment}
          onChangeCategory={(
            category: string,
            duration: string,
            increment: string
          ) => {
            setGameSettings({ ...gameSettings, category, duration, increment });
          }}
          onChangeDuration={(duration: string) =>
            setGameSettings({ ...gameSettings, duration })
          }
          onChangeIncrement={(increment: string) =>
            setGameSettings({ ...gameSettings, increment })
          }
        />
        <UndoOptionSlider
          allowed={gameSettings.undoAllowed}
          setAllowed={(allowed: boolean) => {
            setGameSettings({ ...gameSettings, undoAllowed: allowed });
          }}
        />
        <StartGameButton
          category={gameSettings.category}
          duration={gameSettings.duration}
          increment={gameSettings.increment}
          undoAllowed={gameSettings.undoAllowed}
        />
      </div>
    </div>
  );
};

export default GameSettingsContainer;
