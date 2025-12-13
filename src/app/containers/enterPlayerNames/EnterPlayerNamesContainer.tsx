import { useDispatch, useSelector } from "react-redux";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import PlayerCard from "./components/PlayerCard";
import PlayerSetupHeader from "./components/PlayerSetupHeader";
import GameSettingsButton from "@/app/containers/enterPlayerNames/components/GameSettingsButton";
import { setPlayerName } from "@/app/redux/slices/gameState/gameStateSlice";
import { selectPlayers } from "@/app/utils/selectors/gameStateSelectors";
import { PlayerType } from "@/app/types/ChessTypes";
import { nextPage } from "@/app/redux/slices/page/pageSlice";

/**
 * Renders the page that showcases where users can enter the player names
 * @returns Enter Player Names Container
 */
const EnterPlayerNamesContainer = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch();
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

  const handleOnEnter = () => {
    if (!isPlayerNamesValid) return;
    dispatch(nextPage());
  };

  const handleStartChessGame = () => {
    if (!isPlayerNamesValid) return;
    dispatch(nextPage());
  };

  return (
    <div className="mt-4 h-auto flex flex-col items-center justify-center gap-12 font-semibold text-center px-4 w-full">
      <PlayerSetupHeader />

      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {players.map((player, i) => (
          <PlayerCard
            key={i}
            player={player}
            onChange={handleOnChange}
            onEnter={handleOnEnter}
          />
        ))}
      </div>

      <GameSettingsButton
        isVisible={isPlayerNamesValid}
        onClick={handleStartChessGame}
      />
    </div>
  );
};

export default EnterPlayerNamesContainer;
