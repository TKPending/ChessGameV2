import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import CapturedPieces from "@/app/containers/players/components/CapturedPieces";
import { PlayerType } from "@/app/types/ChessTypes";

type Props = {
  playerNo: number;
  className: string;
};

const PlayerContainer = ({ playerNo, className }: Props) => {
  const player: PlayerType = useSelector(
    (state: RootState) => state.gameState.players[playerNo]
  );

  return (
    <div
      className={`w-full flex items-center ${
        playerNo === 0 ? "justify-start" : "justify-end"
      } px-6 md:px-12`}
    >
      <section
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
      </section>
    </div>
  );
};

export default PlayerContainer;
