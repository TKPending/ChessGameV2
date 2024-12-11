import { TileType } from "@/app/types/TileType";

export const getTileBackgroundColor = (tile: TileType): string => {
  if (tile.isHighlighted) {
    return tile.highlightReason === "enemy"
      ? "bg-red-200"
      : tile.highlightReason === "selected"
      ? "bg-blue-200"
      : "bg-green-200";
  }
  return tile.defaultTileColor === "White" ? "bg-white" : "bg-gray-800";
};
