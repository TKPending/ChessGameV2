import { TileType } from "@/app/types/TileType";

/**
 * Function to determine what the background colour of a tile will be
 * @param tile Indicates the specific tile to be updated
 * @returns The colour that the tile will become
 */
export const getTileBackgroundColor = (tile: TileType): string => {
  if (tile.isHighlighted) {
    switch (tile.highlightReason) {
      case "selected":
        return "bg-blue-200";
      case "friendly":
        return "bg-green-200";
      case "enemy":
        return "bg-red-200";
      default:
        return "";
    }
  }
  return tile.defaultTileColor === "White" ? "bg-light-tile" : "bg-dark-tile";
};
