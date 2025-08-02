import { useDispatch } from "react-redux";
import Button from "@/app/components/Button";
import { PageEnum } from "@/app/types/PageTypes";
import { navigateToPage } from "@/app/utils/page/navigateToPage";

const LandingButtonsContainer = () => {
  const dispatch = useDispatch();

  const handleRulesTransition = () => {
    navigateToPage(dispatch, PageEnum.landing, PageEnum.gameRules);
  };

  const handlePlayersTransition = () => {
    navigateToPage(dispatch, PageEnum.landing, PageEnum.enterPlayers);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-8">
      <Button
        text="Read the Rules"
        className="border-customGreen border-2 text-customGreen hover:bg-opacity-90 w-auto rounded-full px-4 hover:bg-customGreen hover:text-white transition duration-300"
        onClick={handleRulesTransition}
      />
      <Button
        text="Play Now"
        className="bg-customGreen text-white hover:bg-opacity-90"
        onClick={handlePlayersTransition}
      />
    </div>
  );
};

export default LandingButtonsContainer;
