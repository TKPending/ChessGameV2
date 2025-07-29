import { Dispatch } from "@reduxjs/toolkit";
import { setMoveCounter } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import {
  setCurrentTurn,
  setEnemyMoves,
  setPiecesAttackingKing,
} from "@/app/redux/slices/board/boardSlice";
import { handleMovePiece } from "@/app/utils/handlers/handleMovePiece";
import { resetTiles } from "@/app/utils/chessboard/design/resetTiles";
import { TileType } from "@/app/types/TileType";

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
  dispatch(setMoveCounter());
  dispatch(setPiecesAttackingKing(null));
};
