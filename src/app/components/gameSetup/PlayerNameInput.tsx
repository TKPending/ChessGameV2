import { useDispatch } from "react-redux";
import { useState } from "react";
import TextInput from "@/app/components/TextInput";
import { setPlayersName } from "@/app/redux/slices/board/boardSlice";

type Props = {
  playerNo: string;
};

const PlayerNameInput = ({ playerNo }: Props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState<string>("");
  const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handlePlayerDispatch = () => {
    if (playerName.length < 2) {
        setInvalidValue(true);
        setIsDisabled(true);
        setTimeout(() => {
            setInvalidValue(false);
            setIsDisabled(false);
        }, 2000);
        return;
    }

    dispatch(setPlayersName({
        playerName,
        playerNo: playerNo === "Player 1" ? 0 : 1,
    }))
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-26 w-3/4">
      <p>{playerNo}</p>
      {invalidValue && <p className="text-xs text-error-red">Pleasure ensure the name is more than 2 letters</p>}
      <TextInput
        value={playerName}
        invalidValue={invalidValue}
        isDisabled={isDisabled}
        customStyle="h-12"
        placeholder={`Enter the name for ${playerNo}`}
        onSaveValue={handlePlayerDispatch}
        handleValueChange={setPlayerName}
      />
    </div>
  );
};

export default PlayerNameInput;
