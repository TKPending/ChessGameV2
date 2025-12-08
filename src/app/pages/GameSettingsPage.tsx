import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import RulesSetupContainer from "@/app/containers/setup/rulesSetup/RulesSetupContainer";
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
      <RulesSetupContainer />
    </>
  );
};

export default GameSettingsPage;
