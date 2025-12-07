import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { resetActiveMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { resetChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { resetChessMoves } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { resetGameState } from "@/app/redux/slices/gameState/gameStateSlice";
import { resetUiHighlights } from "@/app/containers/chessboard/utils/chessboard/design/resetUiHighlights";
import { resetUiPreviousMoveTiles } from "../redux/slices/uiChessboard/uiChessboardSlice";

export const resetChessGame = (
  dispatch: Dispatch<UnknownAction>,
  options: { swapColors: boolean }
) => {
  dispatch(resetChessMoves());
  dispatch(resetChessboard());
  dispatch(resetActiveMoves());
  dispatch(resetGameState(options));
  dispatch(resetUiPreviousMoveTiles());
  resetUiHighlights(dispatch);
};
