import { useSelector } from "react-redux";
import Chessboard from "@/app/containers/chessboard/Chessboard";
import ChessboardMoveHistory from "@/app/containers/chessboardMoveHistory/ChessboardMoveHistory";
import PlayerContainer from "@/app/containers/players/PlayerContainer";
import {
  selectPlayerOne,
  selectPlayerTwo,
  selectViewingMode,
} from "@/app/utils/selectors/gameStateSelectors";
import { PlayerType } from "@/app/types/ChessTypes";

/**
 * Renders the Chessboard and Player Containers & During viewing mode renders the Move History
 * @returns Chessboard, Players and Move History
 */
export const BoardMain = () => {
  const playerOne: PlayerType = useSelector(selectPlayerOne);
  const playerTwo: PlayerType = useSelector(selectPlayerTwo);
  const viewingMode: boolean = useSelector(selectViewingMode);

  return (
    <div className="flex h-full md:w-full p-2 gap-4">
      <div className="flex flex-col items-center justify-center gap-y-12 md:gap-y-4 md:justify-around h-full w-full p-2 md:px-20 gap-4">
        {/* Top */}
        <PlayerContainer player={playerTwo} />

        <Chessboard />

        {/* Bottom */}
        <PlayerContainer player={playerOne} />
      </div>
      {viewingMode && <ChessboardMoveHistory />}
    </div>
  );
};

export default BoardMain;
