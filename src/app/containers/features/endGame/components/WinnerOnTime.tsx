import { useSelector } from "react-redux";
import {
  selectCurrentTurn,
  selectWinner,
} from "@/app/utils/selectors/gameStateSelectors";
import { PlayerType, ChessColors } from "@/app/types/ChessTypes";

const WinnerOnTime = () => {
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const winner: PlayerType | null = useSelector(selectWinner);

  return (
    <div className="flex flex-col items-center text-center gap-8 mb-4">
      <p className="text-4xl tracking-tight text-[rgba(255,215,128,0.75)] font-bold drop-shadow-[0_0_10px_rgba(255,215,128,0.45)]">
        {winner?.playerName} has claimed victory
      </p>
      <p className="text-lg text-[rgba(255,215,128,0.65)] max-w-[300px] leading-snug">
        Your opponent ran out of time.
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

export default WinnerOnTime;
