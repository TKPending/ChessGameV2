import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  recordBoardState,
  recordMove,
} from "@/app/redux/slices/history/historySlice";
import { setCapturedPiece } from "@/app/redux/slices/gameState/gameStateSlice";
import { setPawnPromotion } from "@/app/redux/slices/chessboardState/chessboardStateSlice";

import { updateChessboard } from "@/app/utils/updateChessboard";
import { hasKingMoved } from "@/app/utils/moveChecks/hasKingMoved";
import { hasRookMoved } from "@/app/utils/moveChecks/hasRookMoved";
import { isPawnPromotion } from "@/app/utils/moveChecks/isPawnPromoting";

import { CastleType } from "@/app/types/MoveTypes";
import {
  TileType,
  PieceType,
  PieceName,
  ChessColors,
} from "@/app/types/ChessTypes";

/**
 * Deals with moving pieces
 * @param dispatch Updates state in Redux
 * @param previousClickedTile The tile that wsa clicked before the current tile
 * @param targetTile The tile that a piece is going to move to
 * @param currentBoardState The current chessboard state
 * @param castleState
 * @returns The chessboard with the updated moves
 */
export const movePiece = (
  dispatch: Dispatch<UnknownAction>,
  previousClickedTile: TileType | null,
  targetTile: TileType,
  currentBoardState: TileType[][],
  moveCount: number,
  castleState: CastleType
) => {
  if (!previousClickedTile?.pieceOnTile) return [];

  const pieceToMove: PieceType = previousClickedTile.pieceOnTile;
  const pieceName: PieceName = pieceToMove.pieceName;
  const currentTurn: ChessColors.white | ChessColors.black =
    pieceToMove.pieceColor;

  // Special Cases
  // Check if the king has moved
  if (pieceName === "King") {
    hasKingMoved(dispatch, currentTurn, castleState);
  }

  // Check if the Rook has moved
  if (pieceName === "Rook") {
    hasRookMoved(dispatch, currentTurn, castleState, previousClickedTile);
  }

  // Check for Pawn Promotion
  if (pieceName === "Pawn") {
    if (isPawnPromotion(targetTile.tilePosition, currentTurn)) {
      dispatch(setPawnPromotion({ isPromotion: true, targetTile }));
    }
  }

  if (targetTile.pieceOnTile) {
    dispatch(
      setCapturedPiece({
        piece: { ...targetTile.pieceOnTile, isAlive: false },
        currentTurn,
      })
    );
  }

  dispatch(
    recordMove({
      moveCount,
      from: previousClickedTile,
      to: targetTile,
    })
  );

  const updatedChessboard = updateChessboard(
    dispatch,
    currentBoardState,
    previousClickedTile,
    targetTile,
    castleState
  );

  dispatch(recordBoardState(updatedChessboard));
};
