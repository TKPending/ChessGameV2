import { PieceType } from "./PieceType";

export enum TileColor {
    white = "white",
    black = "black",
};

export interface TileType {
  tilePosition: string;
  tileColor: TileColor;
  pieceOnTile: PieceType | null;
  isHighlighted: boolean;
};
