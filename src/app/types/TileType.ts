import { PieceType } from "./PieceType";

export enum TileColor {
  white = "White",
  black = "Black",
}

export interface TileType {
  tilePosition: string;
  defaultTileColor: TileColor;
  currentTileColor: string;
  pieceOnTile: PieceType | null;
  isHighlighted: boolean;
  highlightReason: "enemy" | "friendly";
}
