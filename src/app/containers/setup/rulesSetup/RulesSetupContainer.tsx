import TimeSettings from "./containers/TimeSettingsContainer";
import UndoOptionSlider from "./components/UndoOptionSlider";
import StartGameButton from "./components/StartGameButton";

const RulesSetupContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-12 py-16">
      <h1 className="text-4xl font-bold text-customGreen text-center">
        Game Settings
      </h1>

      <div className="flex flex-col items-center justify-center gap-10 w-3/4 md:w-full max-w-4xl">
        <TimeSettings />
        <UndoOptionSlider />
        <StartGameButton />
      </div>
    </div>
  );
};

export default RulesSetupContainer;
