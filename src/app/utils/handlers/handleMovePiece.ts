import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCapturedPiece } from "@/app/redux/slices/gameState/gameStateSlice";
import {
  updateChessboardHistory,
  updateMoveHistory,
} from "@/app/redux/slices/chessMoves/chessMovesSlice";
import { updateChessboard } from "./helpers/handleMovePieceHelpers/updateChessboard";
import { handleMovesSpecialCases } from "./helpers/handleMovePieceHelpers/handleMovesSpecialCases";
import { CastleType } from "@/app/types/MoveTypes";
import { TileType, PieceType } from "@/app/types/ChessTypes";

/**
 * Deals with moving pieces
 * @param dispatch Updates state in Redux
 * @param previousClickedTile The tile that wsa clicked before the current tile
 * @param targetTile The tile that a piece is going to move to
 * @param currentBoardState The current chessboard state
 * @param castling
 * @returns The chessboard with the updated moves
 */
export const handleMovePiece = (
  dispatch: Dispatch<UnknownAction>,
  previousClickedTile: TileType | null,
  targetTile: TileType,
  currentBoardState: TileType[][],
  castling: CastleType
) => {
  if (!previousClickedTile?.pieceOnTile) return [];

  const pieceToMove: PieceType = previousClickedTile.pieceOnTile;
  const currentTurn: "White" | "Black" = pieceToMove.pieceColor;

  handleMovesSpecialCases(
    dispatch,
    pieceToMove,
    targetTile,
    previousClickedTile,
    currentTurn,
    castling
  );

  if (targetTile.pieceOnTile) {
    dispatch(
      setCapturedPiece({
        piece: { ...targetTile.pieceOnTile, isAlive: false },
        currentTurn,
      })
    );
  }

  dispatch(updateChessboardHistory(currentBoardState));

  dispatch(
    updateMoveHistory({
      from: previousClickedTile,
      to: targetTile,
    })
  );

  return updateChessboard(
    currentBoardState,
    previousClickedTile,
    targetTile,
    false,
    dispatch
  );
};
