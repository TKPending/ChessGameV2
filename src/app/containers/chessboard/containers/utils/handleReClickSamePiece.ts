import { handlePieceOnTile } from "@/app/utils/handlers/handlePieceOnTile";
import { Dispatch } from "@reduxjs/toolkit";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

export const handleReClickSamePiece = (
  dispatch: Dispatch<any>,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  piecesAttackingKing: any,
  validCheckMoves: any,
  enemyMoves: any,
  currentTurn: ChessColors.white | ChessColors.black
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
