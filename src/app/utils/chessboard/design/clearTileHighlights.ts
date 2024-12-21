import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const clearTileHighlights = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][]
) => {
  chessboard.forEach((row) => {
    row.forEach((tile) => {
      if (tile.isHighlighted) {
        dispatch(
          setSpecificTile({
            ...tile,
            isHighlighted: false,
            highlightReason: "",
          })
        );
      }
    });
  });
};
