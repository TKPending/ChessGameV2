import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import CapturedPieces from "@/app/containers/players/components/CapturedPieces";
import { PlayerType } from "@/app/types/ChessTypes";

type Props = {
  playerNo: number;
  className: string;
};

const Players = ({ playerNo, className }: Props) => {
  const player: PlayerType = useSelector(
    (state: RootState) => state.gameState.players[playerNo]
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.chessboard.isKingInCheck
  );
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.chessboard.currentTurn
  );

  return (
    <div
      className={`bg-section-background shadow-lg w-full md:w-1/2 h-20 gap-1 p-2 px-4 flex flex-col rounded-lg justify-start ${className}`}
    >
      <p
        className={`flex items-center justify-start gap-2 text-md text-customGreen`}
      >
        {player.playerName}
        <img
          src={`${player.team.toLowerCase()}-king.png`}
          className="h-6 w-6"
          alt={`${player.team} king piece`}
        />
      </p>
      <CapturedPieces player={player} />
    </div>
  );
};

export default Players;
