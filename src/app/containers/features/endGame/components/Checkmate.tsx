import { useSelector } from "react-redux";
import {
  selectCurrentTurn,
  selectPlayers,
} from "@/app/utils/selectors/gameStateSelectors";
import { ChessColors, PlayerType } from "@/app/types/ChessTypes";

const Checkmate = () => {
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const players: PlayerType[] = useSelector(selectPlayers);
  const winner = currentTurn === "White" ? players[1] : players[0];

  return (
    <div className="flex flex-col items-center text-center gap-5">
      <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,215,128,0.45)]">
        Checkmate
      </h1>

      <p className="text-lg text-[rgba(255,215,128,0.75)] font-medium">
        {winner.playerName} has claimed victory
      </p>

      <img
        src={`${currentTurn === "White" ? "black" : "white"}-king.png`}
        className="h-28 w-28 drop-shadow-[0_0_25px_rgba(255,215,128,0.55)] 
               animate-softPulse"
        alt="king piece"
      />
    </div>
  );
};

export default Checkmate;
