import KingPiece from "@/app/components/startScreenComponents/KingPiece";
import PlayNow from "@/app/components/startScreenComponents/PlayNow";

type Props = {
  handleGameSetupLayout: () => void;
};

const StartScreenLayout = ({ handleGameSetupLayout }: Props) => {
  return (
    <div className="h-screen w-screen flex text-center flex-col gap-12 md:gap-32 items-center justify-center md:flex-row">
      <KingPiece kingColor={"white"} animateDirection="left" />
      <PlayNow onClick={handleGameSetupLayout} />
      <KingPiece kingColor={"black"} animateDirection="right" />
    </div>
  );
};

export default StartScreenLayout;
