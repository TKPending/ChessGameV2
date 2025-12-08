import { useDispatch } from "react-redux";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import Button from "@/app/components/Button";
import { navigateToPage } from "@/app/utils/navigateToPage";
import { PageEnum } from "@/app/types/PageTypes";

/**
 * Renders the 'Read Rules' and 'Play Now' Buttons
 * @returns Buttons shown on Landing Page
 */
const LandingButtonsContainer = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const handleRulesTransition = () => {
    navigateToPage(dispatch, PageEnum.landing, PageEnum.gameRules);
  };

  const handlePlayersTransition = () => {
    navigateToPage(dispatch, PageEnum.landing, PageEnum.enterPlayerNames);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-8 text-2xl">
      <Button
        text="Read the Rules"
        textStyle="text-md"
        className="border-customGreen border-2 text-customGreen hover:bg-opacity-90 w-auto rounded-full px-4 hover:bg-customGreen hover:text-white transition duration-300"
        onClick={handleRulesTransition}
      />
      <Button
        text="Play Now"
        textStyle="text-md"
        className="bg-customGreen text-white hover:bg-opacity-90"
        onClick={handlePlayersTransition}
      />
    </div>
  );
};

export default LandingButtonsContainer;
