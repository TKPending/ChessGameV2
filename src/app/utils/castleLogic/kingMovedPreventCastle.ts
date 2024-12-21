import { setKingHasMoved } from "@/app/redux/slices/board/boardSlice";
import { CastleType } from "@/app/types/CastleType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const kingMovedPreventCastle = (
  dispatch: Dispatch<UnknownAction>,
  castleColor: "white" | "black",
  castling: CastleType
) => {
  if (castling[`${castleColor}King`].kingMoved) return;

  dispatch(setKingHasMoved());
};
