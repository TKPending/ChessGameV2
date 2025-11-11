import TextInput from "@/app/components/TextInput";
import { PlayerType } from "@/app/types/ChessTypes";

type PlayerNameEntryProps = {
  player: PlayerType;
  onChange: (newValue: string, playerNo: number) => void;
};

const PlayerNameEntry = ({ player, onChange }: PlayerNameEntryProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <p className="text-customGreen text-2xl">Player {player.no + 1}</p>

      <div className="w-full h-16">
        <TextInput
          value={player.playerName}
          playerNo={player.no}
          customStyle="h-20 p-2 md:text-3xl"
          placeholder={`Enter name`}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PlayerNameEntry;
