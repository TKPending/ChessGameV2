import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import EnterPlayers from "@/app/containers/enterPlayers/EnterPlayers";
import StartGameButton from "@/app/containers/enterPlayers/components/StartGameButton";
import { PlayerType } from "@/app/types/ChessTypes";

const EnterPlayersPage = () => {
  const players: PlayerType[] = useSelector(
    (state: RootState) => state.gameState.players
  );

  const validPlayerNames: boolean = players.every(
    (name: PlayerType) => name.playerName.length > 2
  );

  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <EnterPlayers />
      {validPlayerNames && <StartGameButton />}
    </div>
  );
};

export default EnterPlayersPage;
