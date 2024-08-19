import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import TextInput from "@/app/components/TextInput";
import { setPlayersName } from "@/app/redux/slices/board/boardSlice";
import { Root } from "postcss";
import { setPlayerNamesAvailable } from "@/app/redux/slices/gameSetup/gameSetupSlice";

type Props = {
  playerNo: string;
};

const PlayerNameInput = ({ playerNo }: Props) => {
  const dispatch = useDispatch();
  const players =  useSelector((state: RootState) => state.board.players);
  const [playerName, setPlayerName] = useState<string>("");
  const [invalidValue, setInvalidValue] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const playerNamesAvailableCheck = () => {
    if (players[0].playerName.length > 2 && players[1].playerName.length > 2) {
      dispatch(setPlayerNamesAvailable(true));
    } else {
      dispatch(setPlayerNamesAvailable(false));
    }
  }

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
    }));

    playerNamesAvailableCheck();
  };

  return (
    <div className="font-semibold flex flex-col gap-2 items-center justify-center h-26 w-1/4">
      <p className="text-white">{playerNo}</p>
      {invalidValue && <p className="text-xs text-error-red">Pleasure ensure the name is more than 2 letters</p>}
      <TextInput
        value={playerName}
        invalidValue={invalidValue}
        isDisabled={isDisabled}
        customStyle="h-16"
        placeholder={`Enter the name for ${playerNo}`}
        onSaveValue={handlePlayerDispatch}
        handleValueChange={setPlayerName}
      />
    </div>
  );
};

export default PlayerNameInput;
