import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import CapturedPieces from "@/app/containers/players/components/CapturedPieces";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { PlayerType } from "@/app/types/PlayerType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  playerNo: number;
  className: string;
};

const Players = ({ playerNo, className }: Props) => {
  const player: PlayerType = useSelector(
    (state: RootState) => state.board.players[playerNo]
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheck
  );
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );

  return (
    <div
      className={`w-1/2 h-16 p-2 flex flex-col rounded-lg justify-center ${className}`}
    >
      <p
        className={`flex items-center justify-center gap-2 text-lg text-customGreen`}
      >
        {player.playerName}{" "}
        {player.team === currentTurn && isInCheck && (
          <div className="relative group flex items-center justify-center h-6 w-6 border-2 border-red-600 rounded-full">
            <FontAwesomeIcon
              icon={faExclamation}
              className="text-red-600 text-xs"
            />
            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-red-600 text-sm p-1 rounded transition duration-400">
              You're in check!
            </div>
          </div>
        )}
      </p>
      <CapturedPieces player={player} />
    </div>
  );
};

export default Players;
