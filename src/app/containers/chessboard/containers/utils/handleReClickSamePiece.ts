import { handlePieceOnTile } from "@/app/utils/handlers/handlePieceOnTile";
import { Dispatch } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/ChessTypes";

export const handleReClickSamePiece = (
  dispatch: Dispatch<any>,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  piecesAttackingKing: any,
  validCheckMoves: any,
  enemyMoves: any,
  currentTurn: any
) => {
  handlePieceOnTile(
    dispatch,
    clickedTile,
    chessboard,
    isInCheck,
    piecesAttackingKing,
    validCheckMoves,
    enemyMoves,
    currentTurn
  );
};
