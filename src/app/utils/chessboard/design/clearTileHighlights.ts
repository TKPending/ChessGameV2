import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

/**
 * Get rid of all the highlighted tiles, making them unlighted.
 * @param dispatch Update Redux State
 * @param chessboard The chessboard that the game is being played on
 */
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
