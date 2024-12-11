import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setSpecificTile,
  setClickedTile,
} from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";

export const firstTileClick = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  previousClickedTile: TileType | null,
  currentTurn: "White" | "Black"
) => {
  const clickedTilePiece: PieceType | null | undefined =
    clickedTile?.pieceOnTile;

  if (!previousClickedTile) {
    if (clickedTilePiece && clickedTilePiece.pieceColor === currentTurn) {
      dispatch(setSpecificTile({ ...clickedTile, isHighlighted: true }));
      dispatch(setClickedTile(clickedTile));
    }

    return;
  }
};
