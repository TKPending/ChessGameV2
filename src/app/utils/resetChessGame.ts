import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { resetActiveMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { resetChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { resetHistory } from "@/app/redux/slices/history/historySlice";
import { clearGameState } from "@/app/redux/slices/gameState/gameStateSlice";
import { resetUiHighlights } from "@/app/utils/chessboard/resetUiHighlights";
import { resetUiPreviousMoveTiles } from "@/app/redux/slices/uiChessboard/uiChessboardSlice";

export const resetChessGame = (
  dispatch: Dispatch<UnknownAction>,
  options: { swapColors: boolean }
) => {
  dispatch(resetHistory());
  dispatch(resetChessboard());
  dispatch(resetActiveMoves());
  dispatch(clearGameState(options));
  dispatch(resetUiPreviousMoveTiles());
  resetUiHighlights(dispatch);
};
