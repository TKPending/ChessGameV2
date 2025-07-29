import KingPiece from "@/app/containers/landing/components/KingPiece";
import PlayNow from "@/app/containers/landing/components/PlayNow";

type Props = {
  transitionStyle: string;
  gameSetupStage: boolean;
  handleGameSetupLayout: () => void;
};

const LandingContainer = ({
  transitionStyle,
  gameSetupStage,
  handleGameSetupLayout,
}: Props) => {
  return (
    <div
      className={`${transitionStyle} z-10 ${
        gameSetupStage
          ? "-translate-x-full opacity-0"
          : "translate-x-0 opacity-100"
      }`}
    >
      <div className="h-screen w-screen flex text-center flex-col gap-12 md:gap-32 items-center justify-center md:flex-row">
        <KingPiece kingColor={"white"} animateDirection="left" />
        <PlayNow onClick={handleGameSetupLayout} />
        <KingPiece kingColor={"black"} animateDirection="right" />
      </div>
    </div>
  );
};

export default LandingContainer;
