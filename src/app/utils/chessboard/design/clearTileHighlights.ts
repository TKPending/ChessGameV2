import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { updateTile } from "@/app/redux/slices/chessboard/chessboardSlice";
import { TileType } from "@/app/types/ChessTypes";

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
          updateTile({
            ...tile,
            isHighlighted: false,
            highlightReason: "",
          })
        );
      }
    });
  });
};
