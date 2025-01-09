import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TextInput from "@/app/components/TextInput";
import { setPlayersName } from "@/app/redux/slices/board/boardSlice";

type Props = {
  playerNo: number;
};

const PlayerNameInput = ({ playerNo }: Props) => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.board.players);
  const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handlePlayerNameChange = (newValue: string) => {
    dispatch(
      setPlayersName({
        playerName: newValue,
        playerNo: playerNo === 0 ? 0 : 1,
      })
    );
  };

  return (
    <div className="font-semibold flex flex-col gap-2 items-center justify-center h-26 w-auto">
      <p className="text-customGreen text-opacity-80 text-2xl">
        Player {playerNo + 1}
      </p>
      {invalidValue && (
        <p className="text-xs text-error-red">
          Pleasure ensure the name is more than 2 letters
        </p>
      )}
      <TextInput
        value={players[playerNo].playerName}
        invalidValue={invalidValue}
        isDisabled={isDisabled}
        customStyle="h-20 p-2 md:text-2xl"
        placeholder={`Enter name`}
        onPlayerNameChange={handlePlayerNameChange}
      />
    </div>
  );
};

export default PlayerNameInput;
