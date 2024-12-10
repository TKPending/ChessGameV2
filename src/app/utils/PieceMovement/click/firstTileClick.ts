import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCurrentTile } from "@/app/redux/slices/tile/tileSlice";
import { setTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";

export const firstTileClick = (
  dispatch: Dispatch<UnknownAction>,
  piece: PieceType | null,
  currentTile: TileType | null,
  clickedTile: TileType,
  currentTurn: "White" | "Black"
) => {
  if (!currentTile) {
    if (piece && piece.pieceColor === currentTurn) {
      dispatch(setTile({ tile: { ...clickedTile, isHighlighted: true } }));
      dispatch(setCurrentTile(clickedTile));
    }

    return;
  }
};
