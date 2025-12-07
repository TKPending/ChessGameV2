import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ErrorContainer from "@/app/containers/errors/ErrorContainer";
import ResetGameModalContainer from "@/app/containers/features/resetGame/containers/ResetGameModalContainer";
import Chessboard from "@/app/containers/chessboard/Chessboard";
import EndGameModal from "@/app/containers/features/endGame/EndGameModal";
import ChessboardMoveHistory from "@/app/containers/chessboardMoveHistory/ChessboardMoveHistory";
import PlayerContainer from "@/app/containers/players/PlayerContainer";
import BackButtonContainer from "@/app/containers/features/backButton/BackButtonContainer";
import UndoButtonContainer from "@/app/containers/features/undoButton/UndoButtonContainer";
import {
  selectIsGameReset,
  selectIsPlaying,
  selectIsRedoAvaialble,
  selectIsRedoVisible,
  selectViewingMode,
  selectWinner,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  selectIsKingInCheckmate,
  selectStalemate,
} from "@/app/utils/selectors/gameStateSelectors";
import { PageEnum } from "@/app/types/PageTypes";
import LiveGameMoveCounterContainer from "../containers/features/moveCounter/LiveGameMoveCounterContainer";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessGamePage = () => {
  const isError: boolean = useSelector(
    (state: RootState) => state.gameState.error.isError
  );
  const isGameReset: boolean = useSelector(selectIsGameReset);
  const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);
  const isRedoVisible: boolean = useSelector(selectIsRedoVisible);
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const viewingMode: boolean = useSelector(selectViewingMode);

  const isCheckmate: boolean = useSelector(selectIsKingInCheckmate);
  const isStalemate: boolean = useSelector(selectStalemate);
  const isWinner = useSelector(selectWinner);

  return (
    <div className="h-screen w-screen max-h-screen max-w-screen overflow-hidden">
      <BackButtonContainer
        currentPage={PageEnum.chessGame}
        nextPage={PageEnum.gamePlayers}
        midGame={true}
      />
      {isError && <ErrorContainer />}

      {(isCheckmate || isStalemate || isWinner) && <EndGameModal />}

      {/* Renders the Chessboard, Players and ChessMoves */}
      <div className="flex h-full md:w-full p-2 px-20 gap-4">
        <div className="h-full md:w-full flex flex-col items-center justify-around p-2 px-20 gap-4">
          <PlayerContainer playerNo={PLAYERTWO} className="items-end" />

          <Chessboard />

          <PlayerContainer playerNo={PLAYERONE} className="items-start" />
        </div>

        {viewingMode && <ChessboardMoveHistory />}
      </div>

      {isPlaying && (
        <div className="hidden sm:flex absolute right-20 bottom-10 flex flex-col gap-4 lg:gap-1 w-40">
          {isRedoAvailable && isRedoVisible && <UndoButtonContainer />}

          <LiveGameMoveCounterContainer />
        </div>
      )}

      {isGameReset && <ResetGameModalContainer />}
    </div>
  );
};

export default ChessGamePage;
