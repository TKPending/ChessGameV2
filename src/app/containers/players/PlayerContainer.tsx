import { useSelector } from "react-redux";
import CapturedPieces from "@/app/containers/players/components/CapturedPieces";
import PlayerTimer from "./components/PlayerTimer";
import PlayerName from "./components/PlayerName";
import { selectTimeSettings } from "@/app/utils/selectors/gameStateSelectors";
import { PlayerType, TimeCatergories, TimeType } from "@/app/types/ChessTypes";

type Props = {
  player: PlayerType;
};

/**
 * Renders the component that displays the user name, pieces they've captured and time
 * @param {PlayerType} player Player to be displayed in the container
 * @returns Player Container
 */
const PlayerContainer = ({ player }: Props) => {
  const timeSettings: TimeType = useSelector(selectTimeSettings);
  const bottomContainer: boolean = player.no == 0;

  return (
    <div
      className={`w-full flex md:px-12 ${
        bottomContainer ? "justify-start" : "justify-end"
      }`}
    >
      {/* Actual Player Container */}
      <section
        className={`bg-section-background shadow-lg w-full md:w-1/2 h-20 gap-1 p-2 px-4 flex flex-col rounded-lg`}
      >
        {/* Renders Time and PlayerName */}
        <div
          className={`w-full flex ${
            bottomContainer ? "flex-row-reverse" : "flex-row"
          } items-center justify-between text-md text-customGreen `}
        >
          {timeSettings.timeCategory !== TimeCatergories.infinite && (
            <PlayerTimer player={player} />
          )}
          <PlayerName player={player} />
        </div>

        {/* Renders Captured Pieces */}
        <CapturedPieces player={player} />
      </section>
    </div>
  );
};

export default PlayerContainer;
