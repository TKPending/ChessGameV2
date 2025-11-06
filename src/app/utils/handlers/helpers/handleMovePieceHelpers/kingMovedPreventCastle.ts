import { setKingHasMoved } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { CastleType } from "@/app/types/MoveTypes";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Checks whether the King has moved
 * @param dispatch Update redux state
 * @param currentTurn Current turn in game
 * @param castling Whether castling is allowed or not
 * @returns Nothing
 */
export const kingMovedPreventCastle = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: "White" | "Black",
  castling: CastleType
) => {
  if (castling[`${currentTurn === "White" ? "white" : "black"}King`].kingMoved)
    return;

  dispatch(setKingHasMoved());
};
