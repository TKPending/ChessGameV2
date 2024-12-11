import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const clearHighlights = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][]
) => {
  const tilesToClear: TileType[] = [];

  chessboard.forEach((row) => {
    row.forEach((tile) => {
      if (tile.isHighlighted) {
        tilesToClear.push({ ...tile, isHighlighted: false });
      }
    });
  });

  // Batch dispatch updates for all tiles
  tilesToClear.forEach((tile) => {
    dispatch(setSpecificTile(tile));
  });
};
