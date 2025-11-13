import TimeSettings from "./components/TimeSettings";
import UndoOptionSlider from "./components/UndoOptionSlider";

const RulesSetupContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-12 py-10">
      <h1 className="text-4xl font-bold text-customGreen text-center">
        Game Settings
      </h1>

      <div className="flex flex-row md:flex-col items-center justify-center gap-10 w-full max-w-4xl">
        <TimeSettings />
        <UndoOptionSlider />
      </div>
    </div>
  );
};

export default RulesSetupContainer;
