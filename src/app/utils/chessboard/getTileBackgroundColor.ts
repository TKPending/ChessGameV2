import { TileType, uiPreviousMoveType } from "@/app/types/ChessTypes";

/**
 * Function to determine what the background colour of a tile will be
 * @param tile Indicates the specific tile to be updated
 * @returns The colour that the tile will become
 */
export const getTileBackgroundColor = (
  tile: TileType,
  uiSelectedTile: TileType | null,
  uiHighlightedTiles: string[],
  uiAttackedTiles: string[],
  uiPreviousMoveTile: uiPreviousMoveType
): string => {
  // Selected piece tile
  if (uiSelectedTile?.tilePosition === tile.tilePosition) {
    return "bg-green-400";
  }

  // Legal move highlight tiles
  if (
    uiHighlightedTiles.includes(tile.tilePosition) &&
    !uiAttackedTiles.includes(tile.tilePosition)
  ) {
    return "bg-green-300 hover:cursor-pointer hover:opacity-90";
  }

  // Attack tiles (e.g. enemy piece capturable)
  if (uiAttackedTiles.includes(tile.tilePosition)) {
    return "bg-red-400 hover:cursor-pointer hover:opacity-90";
  }

  // Previous move highlight
  if (
    uiPreviousMoveTile.from === tile.tilePosition ||
    uiPreviousMoveTile.to === tile.tilePosition
  ) {
    return "bg-neutral-400/20 bg-opacity-80";
  }

  // Default tile color
  return tile.defaultTileColor === "White" ? "bg-light-tile" : "bg-dark-tile";
};
