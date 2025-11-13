import { useDispatch, useSelector } from "react-redux";
import PlayerSetupHeader from "./components/PlayerSetupHeader";
import StartGameButton from "@/app/containers/setup/playerSetup/components/ChessSettingButton";
import { setPlayerName } from "@/app/redux/slices/gameState/gameStateSlice";
import { setIsGamePlaying } from "@/app/redux/slices/gameState/gameStateSlice";
import { navigateToPage } from "@/app/utils/navigateToPage";
import { selectPlayers } from "@/app/utils/selectors/gameStateSelectors";
import { PageEnum } from "@/app/types/PageTypes";
import { PlayerType } from "@/app/types/ChessTypes";
import PlayerCard from "./components/PlayerCard";

const PlayerSetupContainer = () => {
  const dispatch = useDispatch();
  const players: PlayerType[] = useSelector(selectPlayers);
  const isPlayerNamesValid: boolean = players.every(
    (name: PlayerType) => name.playerName.length > 1
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
    navigateToPage(dispatch, PageEnum.gamePlayers, PageEnum.gameSetup);
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center gap-12 font-semibold text-center px-4 w-full">
      <PlayerSetupHeader />

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {players.map((player, i) => (
          <PlayerCard key={i} player={player} onChange={handleOnChange} />
        ))}
      </div>

      <StartGameButton
        isVisible={isPlayerNamesValid}
        onClick={handleStartChessGame}
      />
    </div>
  );
};

export default PlayerSetupContainer;
