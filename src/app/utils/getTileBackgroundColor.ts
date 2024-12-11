import { TileType } from "@/app/types/TileType";

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
  return tile.defaultTileColor === "White" ? "bg-white" : "bg-gray-800";
};
