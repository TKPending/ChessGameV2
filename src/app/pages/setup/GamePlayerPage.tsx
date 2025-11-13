import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import PlayerSetupContainer from "@/app/containers/setup/playerSetup/PlayerSetupContainer";
import { PageEnum } from "@/app/types/PageTypes";

const GamePlayerPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <BackButtonContainer
        currentPage={PageEnum.gamePlayers}
        nextPage={PageEnum.landing}
      />
      <PlayerSetupContainer />
    </div>
  );
};

export default GamePlayerPage;
