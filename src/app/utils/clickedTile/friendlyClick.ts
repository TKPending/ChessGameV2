import { TileType } from "@/app/types/TileType";
import { updateTile } from "@/app/utils/updateTile";

export const friendlyClick = (dispatch: any, currentTile: TileType, previousTile: TileType) => {
    console.log("Previous Tile:", previousTile);
    console.log("Current Tile:", currentTile);
  
    const updatedPreviousTile = { ...previousTile, isHighlighted: false };
    const updatedCurrentTile = { ...currentTile, isHighlighted: true };
  
    updateTile(dispatch, updatedPreviousTile);
    updateTile(dispatch, updatedCurrentTile);
  };
  
