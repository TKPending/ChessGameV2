import { PieceType } from "./PieceType";

export enum TileColor {
    white = "White",
    black = "Black",
};

export interface TileType {
  defaultTileColor: TileColor,
  tilePosition: string;
  currentTileColor: string;
  pieceOnTile: PieceType | null;
  isHighlighted: boolean;
};
