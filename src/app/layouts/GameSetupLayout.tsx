import { useState } from "react";
import PlayerNameSetupContainer from "@/app/containers/gameSetup/PlayerNameSetupContainer";
import GameIntroContainer from "@/app/containers/gameIntro/GameIntroContainer";

const GameSetupLayout = () => {
  const [gameSetupStage, setGameSetupStage] = useState<boolean>(false);

  const handleGameSetupSwitch = () => {
    if (!gameSetupStage){
      setGameSetupStage(true);
    }
  };

  return (
    <div className="h-screen w-screen">
      {gameSetupStage ? <PlayerNameSetupContainer /> : <GameIntroContainer onClick={handleGameSetupSwitch} />}
    </div>
  );
};

export default GameSetupLayout;
