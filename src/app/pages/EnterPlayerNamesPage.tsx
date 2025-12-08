import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import EnterPlayerNamesContainer from "@/app/containers/enterPlayerNames/EnterPlayerNamesContainer";
import { PageEnum } from "@/app/types/PageTypes";

/**
 * Renders the page for users to enter player names
 * @returns Enter Player Name Page
 */
const EnterPlayerNamesPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <BackButtonContainer
        currentPage={PageEnum.enterPlayerNames}
        nextPage={PageEnum.landing}
      />
      <EnterPlayerNamesContainer />
    </div>
  );
};

export default EnterPlayerNamesPage;
