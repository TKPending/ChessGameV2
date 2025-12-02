import { TileType, ChessColors } from "@/app/types/ChessTypes";
import { checkTile } from "./checkTile";

/**
 * Return all piece moves that aren't blocked by a friendly
 * @param chessboard Current chessboard state
 * @param defaultMoves All possible moves a piece can make
 * @param pieceToMoveColor Color of the piece that is being checked
 * @returns All moves that are legal
 */
export const pieceMoves = (
  chessboard: TileType[][],
  defaultMoves: [number, number][],
  pieceToMoveColor: ChessColors.white | ChessColors.black
): [number, number][] => {
  const pieceValidMoves: [number, number][] = [];

  defaultMoves.forEach(([targetRow, targetCol]) => {
    const withinChessboard: boolean =
      targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8;

    if (withinChessboard) {
      const targetTile: TileType = chessboard[targetRow][targetCol];

      if (checkTile(targetTile, pieceToMoveColor)) {
        pieceValidMoves.push([targetRow, targetCol]);
      }
    }
  });

  return pieceValidMoves;
};
