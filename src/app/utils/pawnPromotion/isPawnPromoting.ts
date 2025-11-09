import { ChessColors } from "@/app/types/ChessTypes";
import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
/**
 * Checks whether a pawn is in a position to promote
 * @param tilePosition The current position a pawn is in
 * @param currentTurn The current turn of the team making a move
 * @returns True or False, depending on whether a pawn can promote or not
 */
export const isPawnPromotion = (
  tilePosition: string,
  currentTurn: ChessColors.white | ChessColors.black
): boolean => {
  const tilePositionIndex: [number, number] = convertTilePosition(tilePosition);

  if (currentTurn === ChessColors.white && tilePositionIndex[0] === 0) {
    return true;
  } else if (currentTurn === ChessColors.black && tilePositionIndex[0] === 7) {
    return true;
  }

  return false;
};
