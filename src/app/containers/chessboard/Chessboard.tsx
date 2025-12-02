import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { generateTiles } from "@/app/containers/chessboard/utils/chessboard/generateTiles";
import PawnPromotionContainer from "@/app/containers/chessboard/features/pawnPromotion/PawnPromotionContainer";
import TileContainer from "@/app/containers/chessboard/features/tile/TileContainer";

import {
  selectChessboard,
  selectPawnPromotion,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTurn,
  selectGameState,
  selectIsKingInCheckmate,
  selectIsRedoAvaialble,
} from "@/app/utils/selectors/gameStateSelectors";
import { selectIsKingInCheck } from "@/app/utils/selectors/moveAnalysisStateSelector";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import { updatePreviousGameState } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";

import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType, PawnPromotionType } from "@/app/types/MoveTypes";
import { generateAllTeamMoves } from "./utils/pieceMovements/generateMoves/generateAllTeamMoves";
import { getPlayerColor } from "@/app/utils/getPlayerColor";

const Chessboard = () => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(selectChessboard);
  const pawnPromotion: PawnPromotionType = useSelector(selectPawnPromotion);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const isKingInCheck: boolean = useSelector(selectIsKingInCheck);
  const currentMoveCount: number = useSelector(selectCurrentMoveCount);
  const currentGameState = useSelector(selectGameState);
  const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);
  // End Game
  const isKingInCheckmate: boolean = useSelector(selectIsKingInCheckmate);

  useEffect(() => {
    // If the board hasn't been initialised yet, generate tiles
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }

    // Store previous state for potential undo.
    if (isRedoAvailable) {
      dispatch(updatePreviousGameState(currentGameState));
    }

    const allEnemyMoves = generateAllTeamMoves(
      chessboard,
      getPlayerColor(currentTurn)
    );
    const currentTeamMoves = generateAllTeamMoves(chessboard, currentTurn);

    console.log({ allEnemyMoves, currentTeamMoves });

    if (currentMoveCount > 3) {
      const allEnemyMoves = generateAllTeamMoves(
        chessboard,
        getPlayerColor(currentTurn)
      );
      const currentTeamMoves = generateAllTeamMoves(chessboard, currentTurn);
    }
  }, [chessboard, currentTurn, isKingInCheck, dispatch, isKingInCheckmate]);

  return (
    <div className="h-auto w-full flex items-center justify-center">
      {/* Pawn promotion is possible */}
      {pawnPromotion.isPawnPromotion && <PawnPromotionContainer />}
      {/* Render Chessboard */}
      <div className="h-full w-full chessboard">
        {chessboard.map((row: TileType[], rowIndex: number) =>
          row.map((tile: TileType, colIndex: number) => (
            <TileContainer key={`${rowIndex}-${colIndex}`} tile={tile} />
          ))
        )}
      </div>
    </div>
  );
};

export default Chessboard;
