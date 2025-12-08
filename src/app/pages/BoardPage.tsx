import { useSelector } from "react-redux";

import BoardFooter from "@/app/layouts/boardPage/BoardFooter";
import BoardHeader from "@/app/layouts/boardPage/BoardHeader";
import BoardMain from "@/app/layouts/boardPage/BoardMain";
import EndGameModal from "@/app/containers/features/endGame/EndGameModal";
import ErrorContainer from "@/app/containers/errors/ErrorContainer";
import ResetGameModalContainer from "@/app/containers/features/resetGame/containers/ResetGameModalContainer";

import {
  selectError,
  selectIsGameReset,
  selectIsPlaying,
  selectWinByTime,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  selectIsKingInCheckmate,
  selectStalemate,
} from "@/app/utils/selectors/gameStateSelectors";

import { ErrorType } from "@/app/types/ChessTypes";

/**
 * Renders the page including the Chessboard, Move History etc
 * @returns Active Game
 */
const BoardPage = () => {
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const error: ErrorType = useSelector(selectError);

  // End Game States
  const isCheckmate: boolean = useSelector(selectIsKingInCheckmate);
  const isStalemate: boolean = useSelector(selectStalemate);
  const isWinByTime = useSelector(selectWinByTime);
  const isGameReset: boolean = useSelector(selectIsGameReset);

  return (
    <div className="h-screen w-screen max-h-screen max-w-screen overflow-hidden">
      {error.isError && <ErrorContainer />}
      <BoardHeader />
      <BoardMain />
      {isPlaying && <BoardFooter />}

      {(isCheckmate || isStalemate || isWinByTime) && <EndGameModal />}
      {isGameReset && <ResetGameModalContainer />}
    </div>
  );
};

export default BoardPage;
