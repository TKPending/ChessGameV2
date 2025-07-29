import { PieceName } from "@/app/types/PieceTypes";

/**
 * Checks the piece, and returns the directions that the piece is allowed to move
 * @param pieceName Name of the piece being checked
 * @returns The direction a piece can move in
 */
export const classifySlidingDirections = (
  pieceName: PieceName
): "horizontal" | "vertical" | "diagonal" | "all" => {
  if (pieceName === PieceName.rook) return "horizontal"; // Rook moves horizontally and vertically
  if (pieceName === PieceName.bishop) return "diagonal"; // Bishop moves diagonally
  if (pieceName === PieceName.queen) return "all"; // Queen moves both diagonally and horizontally/vertically
  return "all";
};
