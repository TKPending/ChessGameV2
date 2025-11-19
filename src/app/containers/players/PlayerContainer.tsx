import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import CapturedPieces from "@/app/containers/players/components/CapturedPieces";
import { PlayerType, TimeCatergories } from "@/app/types/ChessTypes";
import PlayerTimer from "./components/PlayerTimer";
import { selectTimeSettings } from "@/app/utils/selectors/gameStateSelectors";

type Props = {
  playerNo: number;
  className: string;
};

const PlayerContainer = ({ playerNo, className }: Props) => {
  const player: PlayerType = useSelector(
    (state: RootState) => state.gameState.players[playerNo]
  );
  const timeSettings = useSelector(selectTimeSettings);

  return (
    <div
      className={`w-full flex items-center ${
        playerNo === 0 ? "justify-start" : "justify-end"
      } px-6 md:px-12`}
    >
      <section
        className={`bg-section-background shadow-lg w-full md:w-1/2 h-20 gap-1 p-2 px-4 flex flex-col rounded-lg justify-start ${className}`}
      >
        <div
          className={`flex items-center justify-between text-md text-customGreen w-full`}
        >
          {timeSettings.timeCategory !== TimeCatergories.infinite && (
            <PlayerTimer playerNo={playerNo} />
          )}
          <div className="flex gap-2">
            <p>{player.playerName}</p>
            <img
              src={`${player.team.toLowerCase()}-king.png`}
              className="h-6 w-6"
              alt={`${player.team} king piece`}
            />
          </div>
        </div>
        <CapturedPieces player={player} />
      </section>
    </div>
  );
};

export default PlayerContainer;
