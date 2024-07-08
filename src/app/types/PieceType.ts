import { TileType } from "./TileType";

export enum PieceColor {
  white = "White",
  black = "Black"
}

export enum PieceName {
    pawn = "Pawn",
    rook = "Rook",
    knight = "Knight",
    bishop = "Bishop",
    queen = "Queen",
    king = "King",
};

export interface PieceType {
  pieceName: PieceName;
  pieceColor: PieceColor;
  piecePosition: TileType;
  allMoves: TileType[];
  validMoves: TileType[];
  isAlive: boolean;
  hasMoved: boolean;
};
