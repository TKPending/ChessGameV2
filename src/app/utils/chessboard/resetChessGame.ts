import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { resetActiveMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { resetChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { resetChessMoves } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { resetGameState } from "@/app/redux/slices/gameState/gameStateSlice";

export const resetChessGame = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(resetChessMoves());
  dispatch(resetChessboard());
  dispatch(resetActiveMoves());
  dispatch(resetGameState());
};
