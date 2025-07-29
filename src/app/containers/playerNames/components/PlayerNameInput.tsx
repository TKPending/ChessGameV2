import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import TextInput from "@/app/components/TextInput";

type PlayerNameInputProps = {
  playerNo: number;
  handlePlayerNameChange: (newValue: string) => void;
};

const PlayerNameInput = ({
  playerNo,
  handlePlayerNameChange,
}: PlayerNameInputProps) => {
  const players = useSelector((state: RootState) => state.gameState.players);
  const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // TODO: Error Handling?

  return (
    <div className="font-semibold flex flex-col gap-2 items-center justify-center h-26 w-auto">
      <p className="text-customGreen text-opacity-80 text-3xl">
        Player {playerNo + 1}
      </p>
      {invalidValue && (
        <p className="text-xs text-error-red">
          Pleasure ensure the name is more than 2 letters
        </p>
      )}
      <div className="w-[400px] h-16">
        <TextInput
          value={players[playerNo].playerName}
          invalidValue={invalidValue}
          isDisabled={isDisabled}
          customStyle="h-20 p-2 md:text-3xl"
          placeholder={`Enter name`}
          onPlayerNameChange={handlePlayerNameChange}
        />
      </div>
    </div>
  );
};

export default PlayerNameInput;
