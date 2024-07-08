import { TileType } from "./TileType";

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
  piecePosition: TileType;
  allMoves: TileType[];
  validMoves: TileType[];
  isAlive: boolean;
  hasMoved: boolean;
};
