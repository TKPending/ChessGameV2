import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ErrorContainer from "@/app/containers/ErrorContainer";
import ResetGameModalContainer from "@/app/containers/resetGame/containers/ResetGameModalContainer";
import Chessboard from "@/app/containers/chessboard/Chessboard";
import Players from "@/app/containers/players/Players";
import ChessMoves from "@/app/containers/chessMoves/ChessMoves";

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
          <Players playerNo={PLAYERTWO} className="items-end" />

          <Chessboard />

          <Players playerNo={PLAYERONE} className="items-start" />
        </div>

        <ChessMoves />
      </div>

      {isReset && <ResetGameModalContainer />}
    </div>
  );
};

export default ChessGamePage;
