import { handlePieceOnTile } from "@/app/utils/handlers/handlePieceOnTile";
import { Dispatch } from "@reduxjs/toolkit";
import { PieceType, TileType } from "@/app/types/ChessTypes";

export const handleFirstClick = (
  dispatch: Dispatch<any>,
  pieceOnTile: PieceType | null,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  piecesAttackingKing: any,
  validCheckMoves: any,
  enemyMoves: any,
  currentTurn: any
) => {
  if (pieceOnTile && pieceOnTile.pieceColor === currentTurn) {
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
  }
};
