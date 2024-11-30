import { PieceType } from "../types/PieceType";
import { TileType } from "../types/TileType";
import { isValidMove } from "./validateMove";

export const getPotentialMoves = (
    piece: PieceType,
    currentTile: TileType,
    board: TileType[][]
  ): TileType[] => {
    const potentialMoves: TileType[] = [];
  
    board.forEach(row => {
      row.forEach(tile => {
        if (isValidMove(piece, currentTile, tile, board)) {
          potentialMoves.push(tile);
        }
      });
    });
  
    return potentialMoves;
  };
  