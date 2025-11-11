import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PlayerNameEntry from "./components/PlayerNameEntry";
import PlayerSetupHeader from "./components/PlayerSetupHeader";
import StartGameButton from "@/app/containers/setup/playerSetup/components/StartGameButton";
import { setPlayerName } from "@/app/redux/slices/gameState/gameStateSlice";
import { setIsGamePlaying } from "@/app/redux/slices/gameState/gameStateSlice";
import { navigateToPage } from "@/app/utils/navigateToPage";
import { PageEnum } from "@/app/types/PageTypes";
import { PlayerType } from "@/app/types/ChessTypes";

const PlayerSetupContainer = () => {
  const dispatch = useDispatch();
  const players: PlayerType[] = useSelector(
    (state: RootState) => state.gameState.players
  );
  const isPlayerNamesValid: boolean = players.every(
    (name: PlayerType) => name.playerName.length > 2
  );

  const handleOnChange = (newValue: string, playerNo: number) => {
    dispatch(
      setPlayerName({
        playerName: newValue,
        playerNo: playerNo,
      })
    );
  };

  const handleStartChessGame = () => {
    if (!isPlayerNamesValid) return;
    dispatch(setIsGamePlaying(true));
    navigateToPage(dispatch, PageEnum.gamePlayers, PageEnum.chessGame);
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center gap-12 font-semibold text-center px-4">
      <PlayerSetupHeader />

      {players.map((player: PlayerType, index: number) => (
        <PlayerNameEntry
          key={index}
          player={player}
          onChange={handleOnChange}
        />
      ))}

      <StartGameButton
        isVisible={isPlayerNamesValid}
        onClick={handleStartChessGame}
      />
    </div>
  );
};

export default PlayerSetupContainer;
