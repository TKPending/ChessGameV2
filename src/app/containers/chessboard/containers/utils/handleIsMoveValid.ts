import { Dispatch } from "@reduxjs/toolkit";
import { incrementMoveCounter } from "@/app/redux/slices/chessMoves/chessMovesSlice";
import { setCurrentTurn } from "@/app/redux/slices/chessboard/chessboardSlice";
import {
  setEnemyMoves,
  setPiecesAttackingKing,
} from "@/app/redux/slices/activeMoves/activeMovesSlice";
import { handleMovePiece } from "@/app/utils/handlers/handleMovePiece";
import { resetTiles } from "@/app/utils/chessboard/design/resetTiles";
import { TileType } from "@/app/types/ChessTypes";

export const handleValidMove = (
  dispatch: Dispatch<any>,
  previousClickedTile: TileType,
  clickedTile: TileType,
  chessboard: TileType[][],
  castling: any // Adjust type as needed
) => {
  const updatedChessboard: TileType[][] | [] = handleMovePiece(
    dispatch,
    previousClickedTile,
    clickedTile,
    chessboard,
    castling
  );
  resetTiles(dispatch, updatedChessboard); // Assuming resetTiles is a helper function

  dispatch(setEnemyMoves([]));
  dispatch(setCurrentTurn());
  dispatch(incrementMoveCounter());
  dispatch(setPiecesAttackingKing(null));
};
