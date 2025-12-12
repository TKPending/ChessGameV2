import { useSelector, useDispatch } from "react-redux";

// Components
import Tile from "./components/Tile";
import PawnPromotionModal from "@/app/containers/pawnPromotion/PawnPromotionModal";

// Custom Hooks
import { useGameLogic } from "@/app/hooks/useGameLogic";

// useSelectors
import {
  selectChessboard,
  selectPawnPromotion,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTeamMoves,
  selectSelectedPieceMoves,
} from "@/app/utils/selectors/moveAnalysisStateSelector";
import {
  selectCastling,
  selectPrevClickedTile,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTurn,
  selectIsPlaying,
} from "@/app/utils/selectors/gameStateSelectors";
import { selectUiPreviousMoveTile } from "@/app/utils/selectors/uiChessboardSelector";
import { selectMoveCount } from "@/app/utils/selectors/historyStateSelectors";

// Redux
import { setRedoVisibility } from "@/app/redux/slices/gameState/gameStateSlice";
import { resetUiPreviousMoveTiles } from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

// Utils
import { resetUiHighlights } from "@/app/utils/chessboard/resetUiHighlights";
import {
  isSameTeamPiece,
  isWrongOpeningClick,
  shouldIgnoreClick,
  isValidMoveSelection,
  isPieceSelection,
  canExecuteMove,
  handlePieceMove,
  handlePieceSelection,
} from "@/app/utils/chessboard/tileClickHelper";

// Types
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType } from "@/app/types/ChessTypes";
import { PawnPromotionType } from "@/app/types/MoveTypes";
import { ChessColors, uiPreviousMoveType } from "@/app/types/ChessTypes";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Renders the Chessboard
 * @returns Chessboard
 */
const Chessboard = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch();
  const chessboard: TileType[][] = useSelector(selectChessboard);

  // Game States
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const moveCount: number = useSelector(selectMoveCount);

  // Tile States
  const prevClickedTile: TileType | null = useSelector(selectPrevClickedTile);
  const uiPreviousMoveTile: uiPreviousMoveType = useSelector(
    selectUiPreviousMoveTile
  );

  // Move States
  const potentialMoves: EnemyAttackType[] = useSelector(selectCurrentTeamMoves);
  const selectedPieceMoves: number[][] = useSelector(selectSelectedPieceMoves);

  // Special Cases state
  const castling = useSelector(selectCastling);
  const pawnPromotion: PawnPromotionType = useSelector(selectPawnPromotion);

  // Handle Game Logic
  useGameLogic();

  /**
   * Handles when a user clicks on a tile
   * @param clickedTile
   */
  const handleTileClick = (clickedTile: TileType) => {
    dispatch(setRedoVisibility(false));
    if (!isPlaying) return;

    const sameTeamClick = isSameTeamPiece(clickedTile, currentTurn);
    const wrongOpeningClick = isWrongOpeningClick(
      clickedTile,
      prevClickedTile,
      currentTurn
    );

    if (shouldIgnoreClick(clickedTile, prevClickedTile)) {
      return;
    }

    if (uiPreviousMoveTile.from !== "") {
      dispatch(resetUiPreviousMoveTiles());
    }

    if (wrongOpeningClick) {
      resetUiHighlights(dispatch);
      return;
    }

    const clickedMoveIsInvalid = !isValidMoveSelection(
      clickedTile,
      selectedPieceMoves
    );
    if (clickedMoveIsInvalid) {
      resetUiHighlights(dispatch);
    }

    if (isPieceSelection(prevClickedTile, sameTeamClick)) {
      return handlePieceSelection(
        dispatch,
        chessboard,
        currentTurn,
        clickedTile,
        potentialMoves
      );
    }

    if (canExecuteMove(prevClickedTile, clickedTile, selectedPieceMoves)) {
      return handlePieceMove(
        dispatch,
        chessboard,
        prevClickedTile,
        clickedTile,
        moveCount,
        castling
      );
    }
  };
  return (
    <div className="h-auto w-full flex items-center justify-center">
      {/* Pawn promotion is possible */}
      {pawnPromotion.isPawnPromotion && <PawnPromotionModal />}

      {/* Render Chessboard */}
      <div className="h-full w-full chessboard">
        {chessboard.map((row: TileType[], rowIndex: number) =>
          row.map((tile: TileType, colIndex: number) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              tile={tile}
              handleClick={handleTileClick.bind(null, tile)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Chessboard;
