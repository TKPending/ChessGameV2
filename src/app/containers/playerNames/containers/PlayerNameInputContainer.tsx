import { useDispatch } from "react-redux";
import { setPlayersName } from "@/app/redux/slices/board/boardSlice";
import PlayerNameInput from "../components/PlayerNameInput";

type Props = {
  playerNo: number;
};

const PlayerNameInputContainer = ({ playerNo }: Props) => {
  const dispatch = useDispatch();

  const handlePlayerNameChange = (newValue: string) => {
    dispatch(
      setPlayersName({
        playerName: newValue,
        playerNo: playerNo === 0 ? 0 : 1,
      })
    );
  };

  return (
    <PlayerNameInput
      playerNo={playerNo}
      handlePlayerNameChange={handlePlayerNameChange}
    />
  );
};

export default PlayerNameInputContainer;
