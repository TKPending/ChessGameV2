import { setTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const clearHighlights = (
  dispatch: Dispatch<UnknownAction>,
  currentBoardState: TileType[][]
) => {
  currentBoardState.forEach((row) => {
    row.forEach((tile) => {
      if (tile.isHighlighted) {
        dispatch(setTile({ tile: { ...tile, isHighlighted: false } }));
      }
    });
  });
};
