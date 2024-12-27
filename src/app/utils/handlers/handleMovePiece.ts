import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setPlayerCapturedPiece } from "@/app/redux/slices/board/boardSlice";
import {
  setChessboardHistory,
  setMoveHistory,
} from "@/app/redux/slices/gameHistory/gameHistorySlice";
import { updateChessboard } from "./helpers/handleMovePieceHelpers/updateChessboard";
import { handleMovesSpecialCases } from "./helpers/handleMovePieceHelpers/handleMovesSpecialCases";
import { CastleType } from "@/app/types/CastleType";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

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
      setPlayerCapturedPiece({
        ...targetTile.pieceOnTile,
        isAlive: false,
      })
    );
  }

  dispatch(setChessboardHistory(currentBoardState));

  dispatch(
    setMoveHistory({
      from: previousClickedTile,
      to: targetTile,
    })
  );

  return updateChessboard(
    dispatch,
    currentBoardState,
    previousClickedTile,
    targetTile
  );
};
