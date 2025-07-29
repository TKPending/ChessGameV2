import { useState } from "react";
import PlayerNamesContainer from "@/app/containers/playerNames/PlayerNamesContainer";
import LandingContainer from "@/app/containers/landing/LandingContainer";
import FooterComponent from "@/app/containers/landing/components/FooterComponent";

const LandingLayout = () => {
  const [gameSetupStage, setGameSetupStage] = useState<boolean>(false);
  const transitionStyle: string =
    "transition-transform transition-opacity duration-500 ease-in-out absolute inset-0 transform ";

  const handleGameSetupLayout = () => {
    setGameSetupStage(true); // Start the transition to the next screen
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <LandingContainer
        transitionStyle={transitionStyle}
        gameSetupStage={gameSetupStage}
        handleGameSetupLayout={handleGameSetupLayout}
      />

      <PlayerNamesContainer
        transitionStyle={transitionStyle}
        gameSetupStage={gameSetupStage}
      />

      <FooterComponent />
    </div>
  );
};

export default LandingLayout;
