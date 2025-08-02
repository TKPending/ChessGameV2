import { useDispatch } from "react-redux";
import { setPlayerName } from "@/app/redux/slices/gameState/gameStateSlice";
import PlayerNameInput from "../components/PlayerNameInput";

type Props = {
  playerNo: number;
};

const PlayerNameInputContainer = ({ playerNo }: Props) => {
  const dispatch = useDispatch();

  const handlePlayerNameChange = (newValue: string) => {
    dispatch(
      setPlayerName({
        playerName: newValue,
        playerNo: playerNo === 0 ? 0 : 1,
      })
    );
  };

  return (
    <PlayerNameInput
      playerNo={playerNo + 0}
      handlePlayerNameChange={handlePlayerNameChange}
    />
  );
};

export default PlayerNameInputContainer;
