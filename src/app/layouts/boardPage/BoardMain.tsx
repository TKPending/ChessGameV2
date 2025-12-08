import { useSelector } from "react-redux";
import Chessboard from "@/app/containers/chessboard/Chessboard";
import ChessboardMoveHistory from "@/app/containers/chessboardMoveHistory/ChessboardMoveHistory";
import PlayerContainer from "@/app/containers/players/PlayerContainer";
import { selectViewingMode } from "@/app/utils/selectors/gameStateSelectors";

const PLAYERONE = 0; // White Player
const PLAYERTWO = 1; // Black Player

/**
 * Renders the Chessboard and Player Containers & During viewing mode renders the Move History
 * @returns Chessboard, Players and Move History
 */
export const BoardMain = () => {
  const viewingMode: boolean = useSelector(selectViewingMode);

  return (
    <div className="flex h-full md:w-full p-2 gap-4">
      <div className="flex flex-col items-center justify-center gap-y-12 md:gap-y-4 md:justify-around h-full w-full p-2 md:px-20 gap-4">
        <PlayerContainer playerNo={PLAYERTWO} className="items-end" />

        <Chessboard />

        <PlayerContainer playerNo={PLAYERONE} className="items-start" />
      </div>
      {viewingMode && <ChessboardMoveHistory />}
    </div>
  );
};

export default BoardMain;
