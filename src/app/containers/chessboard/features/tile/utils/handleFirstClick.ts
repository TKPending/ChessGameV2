import { handlePieceOnTile } from "@/app/containers/chessboard/utils/handlers/handlePieceOnTile";
import { Dispatch } from "@reduxjs/toolkit";
import { ChessColors, PieceType, TileType } from "@/app/types/ChessTypes";

export const handleFirstClick = (
  dispatch: Dispatch<any>,
  pieceOnTile: PieceType | null,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  piecesAttackingKing: any,
  validCheckMoves: any,
  enemyMoves: any,
  currentTurn: ChessColors.white | ChessColors.black
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
