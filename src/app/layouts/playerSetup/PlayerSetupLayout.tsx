import { useState } from "react";
import PlayerNamesLayout from "@/app/layouts/playerSetup/PlayerNamesLayout";
import StartScreenLayout from "@/app/layouts/playerSetup/StartScreenLayout";
import FooterComponent from "@/app/components/startScreenComponents/FooterComponent";

const PlayerSetupLayout = () => {
  const [gameSetupStage, setGameSetupStage] = useState<boolean>(false);

  const handleGameSetupLayout = () => {
    setGameSetupStage(true); // Start the transition to the next screen
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Start Screen Layout */}
      <div
        className={`transition-transform transition-opacity duration-500 ease-in-out absolute inset-0 transform z-10 ${
          gameSetupStage
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <StartScreenLayout handleGameSetupLayout={handleGameSetupLayout} />
      </div>

      {/* Player Names Layout */}
      <div
        className={`transition-transform transition-opacity duration-500 ease-in-out absolute inset-0 transform z-0 ${
          gameSetupStage
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <PlayerNamesLayout />
      </div>

      <FooterComponent />
    </div>
  );
};

export default PlayerSetupLayout;
