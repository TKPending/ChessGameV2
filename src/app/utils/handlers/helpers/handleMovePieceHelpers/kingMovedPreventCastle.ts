import { setKingHasMoved } from "@/app/redux/slices/board/boardSlice";
import { CastleType } from "@/app/types/CastleType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const kingMovedPreventCastle = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: "White" | "Black",
  castling: CastleType
) => {
  if (castling[`${currentTurn === "White" ? "white" : "black"}King`].kingMoved)
    return;

  dispatch(setKingHasMoved());
};
