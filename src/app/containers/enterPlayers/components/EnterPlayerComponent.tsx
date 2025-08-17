import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import TextInput from "@/app/components/TextInput";
import { PlayerType } from "@/app/types/ChessTypes";

type LandingPlayersProps = {
  playerNo: number;
  handleOnChange: (newValue: string, playerNo: number) => void;
};

const LandingPlayersComponent = ({
  playerNo,
  handleOnChange,
}: LandingPlayersProps) => {
  const player: PlayerType = useSelector(
    (state: RootState) => state.gameState.players[playerNo]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <p className="text-customGreen text-2xl">Player {playerNo + 1}</p>
      <div className="w-full h-16">
        <TextInput
          value={player.playerName}
          playerNo={playerNo}
          customStyle="h-20 p-2 md:text-3xl"
          placeholder={`Enter name`}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default LandingPlayersComponent;
