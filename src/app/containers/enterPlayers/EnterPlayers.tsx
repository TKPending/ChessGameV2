import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import EnterPlayerComponent from "@/app/containers/enterPlayers/components/EnterPlayerComponent";
import { setPlayerName } from "@/app/redux/slices/gameState/gameStateSlice";
import { PlayerType } from "@/app/types/ChessTypes";

const LandingPlayerContainer = () => {
  const dispatch = useDispatch();
  const players: PlayerType[] = useSelector(
    (state: RootState) => state.gameState.players
  );

  const handleOnChange = (newValue: string, playerNo: number) => {
    dispatch(
      setPlayerName({
        playerName: newValue,
        playerNo: playerNo,
      })
    );
  };

  return (
    <div className="h-auto flex flex-col items-center justify-center gap-4">
      <p className="text-customGreen text-2xl">
        Enter the names of your players
      </p>
      {players.map((player: PlayerType, index: number) => (
        <EnterPlayerComponent
          key={index}
          playerNo={player.no}
          handleOnChange={handleOnChange}
        />
      ))}
    </div>
  );
};

export default LandingPlayerContainer;
