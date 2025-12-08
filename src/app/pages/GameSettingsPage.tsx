import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import GameSettingsContainer from "@/app/containers/gameSettings/GameSettingsContainer";
import { PageEnum } from "@/app/types/PageTypes";

/**
 * Renders the Game Settings Page
 * @returns Game Settings
 */
const GameSettingsPage = () => {
  return (
    <>
      <BackButtonContainer
        currentPage={PageEnum.gameSettings}
        nextPage={PageEnum.enterPlayerNames}
      />
      <GameSettingsContainer />
    </>
  );
};

export default GameSettingsPage;
