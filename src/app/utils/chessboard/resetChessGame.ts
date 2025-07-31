import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { resetActiveMoves } from "@/app/redux/slices/activeMoves/activeMovesSlice";
import { resetChessboard } from "@/app/redux/slices/chessboard/chessboardSlice";
import { resetChessMoves } from "@/app/redux/slices/chessMoves/chessMovesSlice";
import { resetGameState } from "@/app/redux/slices/gameState/gameStateSlice";

export const resetChessGame = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(resetChessMoves());
  dispatch(resetChessboard());
  dispatch(resetActiveMoves());
  dispatch(resetGameState());
};
