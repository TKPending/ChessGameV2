import { useSelector } from "react-redux";
import {
  selectCurrentTurn,
  selectIsPlaying,
  selectPlayers,
  selectWinner,
} from "@/app/utils/selectors/gameStateSelectors";
import { ChessColors, PlayerType } from "@/app/types/ChessTypes";

const HiddenMovesDisplay = () => {
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const player: PlayerType[] = useSelector(selectPlayers);
  const winner = useSelector(selectWinner);
  const isPlaying: boolean = useSelector(selectIsPlaying);

  return (
    <div className="h-10 md:h-full w-full flex flex-row md:flex-col items-center justify-center gap-2">
      {!isPlaying ? (
        <p className="text-customGreen text-md md:text-lg">
          {winner?.playerName} has won
        </p>
      ) : (
        <p className="text-customGreen text-md md:text-lg">
          {currentTurn === ChessColors.white
            ? player[1].playerName
            : player[0].playerName}{" "}
          Turn
        </p>
      )}
    </div>
  );
};

export default HiddenMovesDisplay;
