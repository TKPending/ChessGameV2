import { useState } from "react";
import PlayerNamesLayout from "@/app/layouts/playerSetup/PlayerNamesLayout";
import GameIntroContainer from "@/app/layouts/playerSetup/StartScreenLayout";

const PlayerSetupLayout = () => {
  const [gameSetupStage, setGameSetupStage] = useState<boolean>(false);

  const handleGameSetupSwitch = () => {
    if (!gameSetupStage) {
      setGameSetupStage(true);
    }
  };

  return (
    <div className="h-screen w-screen">
      {gameSetupStage ? (
        <PlayerNamesLayout />
      ) : (
        <GameIntroContainer onClick={handleGameSetupSwitch} />
      )}
    </div>
  );
};

export default PlayerSetupLayout;
