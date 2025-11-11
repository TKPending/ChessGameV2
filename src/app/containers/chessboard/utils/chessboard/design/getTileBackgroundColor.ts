import { TileType } from "@/app/types/ChessTypes";

/**
 * Function to determine what the background colour of a tile will be
 * @param tile Indicates the specific tile to be updated
 * @returns The colour that the tile will become
 */
export const getTileBackgroundColor = (tile: TileType): string => {
  if (tile.isHighlighted) {
    switch (tile.highlightReason) {
      case "selected":
      case "friendly":
        return "bg-green-300 hover:cursor-pointer hover:opacity-90 ";
      case "enemy":
        return "bg-red-400 hover:cursor-pointer hover:opacity-90";
      default:
        return "";
    }
  }
  return tile.defaultTileColor === "White" ? "bg-light-tile" : "bg-dark-tile";
};
