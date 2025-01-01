import KingPiece from "@/app/components/startScreenComponents/KingPiece";
import PlayNow from "@/app/components/startScreenComponents/PlayNow";

type Props = {
  handleGameSetupLayout: () => void;
};

const StartScreenLayout = ({ handleGameSetupLayout }: Props) => {
  return (
    <div className="flex items-center justify-around px-8">
      <KingPiece kingColor={"white"} animateDirection="left" />
      <PlayNow onClick={handleGameSetupLayout} />
      <KingPiece kingColor={"black"} animateDirection="right" />
    </div>
  );
};

export default StartScreenLayout;
