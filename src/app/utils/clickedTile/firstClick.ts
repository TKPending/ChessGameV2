import { TileType } from "@/app/types/TileType";
import { updateTile } from "@/app/utils/updateTile";

export const firstClick = (dispatch: any, currentTurn: "White" | "Black", currentTile: TileType) => {
  if (currentTurn == currentTile.pieceOnTile?.pieceColor) {
      const updatedTile = { ...currentTile, isHighlighted: true };
      updateTile(dispatch, updatedTile);
  }
};
