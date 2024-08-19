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
  const players =  useSelector((state: RootState) => state.board.players);
  const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handlePlayerNameChange = (newValue: string) => {
    dispatch(setPlayersName({
        playerName: newValue,
        playerNo: playerNo === 0 ? 0 : 1,
    }));
  };

  return (
    <div className="font-semibold flex flex-col gap-2 items-center justify-center h-26 w-1/4">
      <p className="text-white text-2xl">Enter the name for Player {playerNo + 1}</p>
      {invalidValue && <p className="text-xs text-error-red">Pleasure ensure the name is more than 2 letters</p>}
      <TextInput
        value={players[playerNo].playerName}
        invalidValue={invalidValue}
        isDisabled={isDisabled}
        customStyle="h-20 text-2xl"
        placeholder={`Enter the name for ${playerNo + 1}`}
        onPlayerNameChange={handlePlayerNameChange}
      />
    </div>
  );
};

export default PlayerNameInput;
