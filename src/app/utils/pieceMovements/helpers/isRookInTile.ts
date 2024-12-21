import { TileType } from "../types/TileType";

export const isRookInTile = (tile: TileType | null): boolean => {
  return tile !== null && tile.pieceOnTile?.pieceName === "Rook";
};
