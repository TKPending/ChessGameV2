import { useState } from "react";
import GameSetupContainer from "@/app/containers/gameSetup/GameSetupContainer";
import GameIntroContainer from "@/app/containers/gameSetup/GameIntroContainer";

const GameSetupLayout = () => {
  const [gameSetupStage, setGameSetupStage] = useState<boolean>(false);

  const handleGameSetupSwitch = () => {
    if (!gameSetupStage){
      setGameSetupStage(true);
    }
  };

  return (
    <div className="h-screen w-screen">
      {gameSetupStage ? <GameSetupContainer /> : <GameIntroContainer onClick={handleGameSetupSwitch} />}
    </div>
  );
};

export default GameSetupLayout;
