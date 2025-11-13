import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import RulesSetupContainer from "@/app/containers/setup/rulesSetup/RulesSetupContainer";
import { PageEnum } from "@/app/types/PageTypes";

const GameSetupPage = () => {
  return (
    <div>
      <BackButtonContainer
        currentPage={PageEnum.gameRules}
        nextPage={PageEnum.gamePlayers}
      />
      <RulesSetupContainer />
      <></>
    </div>
  );
};

export default GameSetupPage;
