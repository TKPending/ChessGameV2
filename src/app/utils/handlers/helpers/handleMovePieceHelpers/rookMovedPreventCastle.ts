import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { CastleType } from "@/app/types/CastleType";
import { TileType } from "@/app/types/TileType";
import { setRookHasMoved } from "@/app/redux/slices/board/boardSlice";

export const rookMovedPreventCastle = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: "White" | "Black",
  castling: CastleType,
  tile: TileType
) => {
  if (!castling[currentTurn === "White" ? "white" : "black"].canCastleOption)
    return;

  const rookPosition = tile.tilePosition;

  // Define the starting positions of the rooks
  const whiteRookLeft = "a1";
  const whiteRookRight = "h1";
  const blackRookLeft = "a8";
  const blackRookRight = "h8";

  // Determine which castle option to disable based on the rook's position
  if (currentTurn === "White") {
    if (rookPosition === whiteRookLeft) {
      dispatch(setRookHasMoved("left"));
    } else if (rookPosition === whiteRookRight) {
      dispatch(setRookHasMoved("right"));
    }
  } else if (currentTurn === "Black") {
    if (rookPosition === blackRookLeft) {
      dispatch(setRookHasMoved("left"));
    } else if (rookPosition === blackRookRight) {
      dispatch(setRookHasMoved("right"));
    }
  }
};
