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
    <div className="h-auto flex flex-col items-center justify-center gap-12 font-semibold text-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-customGreen text-6xl">Enter Player Names</p>
        <p className="text-white">Each player must have atleast 2 characters</p>
      </div>
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
