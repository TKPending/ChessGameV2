import { setKingHasMoved } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { ChessColors } from "@/app/types/ChessTypes";
import { CastleType } from "@/app/types/MoveTypes";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Checks whether the King has moved
 * @param dispatch Update redux state
 * @param currentTurn Current turn in game
 * @param castling Whether castling is allowed or not
 * @returns Nothing
 */
export const hasKingMoved = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: ChessColors.white | ChessColors.black,
  castling: CastleType
) => {
  if (castling[`${currentTurn === "White" ? "white" : "black"}King`].kingMoved)
    return;

  dispatch(setKingHasMoved(currentTurn));
};
