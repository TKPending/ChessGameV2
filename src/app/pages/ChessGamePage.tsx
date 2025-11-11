import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ErrorContainer from "@/app/containers/errors/ErrorContainer";
import ResetGameModalContainer from "@/app/containers/features/resetGame/containers/ResetGameModalContainer";
import Chessboard from "@/app/containers/chessboard/Chessboard";
import PlayerContainer from "@/app/containers/players/PlayerContainer";
import ChessboardMoveHistory from "@/app/containers/chessboardMoveHistory/ChessboardMoveHistory";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessGamePage = () => {
  const isError: boolean = useSelector(
    (state: RootState) => state.gameState.error.isError
  );
  const isReset: boolean = useSelector(
    (state: RootState) => state.gameState.isGameReset
  );

  return (
    <div className="h-screen w-screen max-h-screen max-w-screen overflow-hidden">
      {isError && <ErrorContainer />}

      {/* Renders the Chessboard, Players and ChessMoves */}
      <div className="h-full w-full flex flex-col items-center md:flex-row gap-4 p-2">
        <div className="h-full md:w-[80%] flex flex-col items-center justify-around p-2 gap-4">
          <PlayerContainer playerNo={PLAYERTWO} className="items-end" />

          <Chessboard />

          <PlayerContainer playerNo={PLAYERONE} className="items-start" />
        </div>

        <ChessboardMoveHistory />
      </div>

      {isReset && <ResetGameModalContainer />}
    </div>
  );
};

export default ChessGamePage;
