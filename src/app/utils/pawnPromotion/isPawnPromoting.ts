import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";
/**
 * Checks whether a pawn is in a position to promote
 * @param tilePosition The current position a pawn is in
 * @param currentTurn The current turn of the team making a move
 * @returns True or False, depending on whether a pawn can promote or not
 */
export const isPawnPromotion = (
  tilePosition: string,
  currentTurn: "White" | "Black"
): boolean => {
  const tilePositionIndex: [number, number] = convertTilePosition(tilePosition);

  if (currentTurn === "White" && tilePositionIndex[0] === 0) {
    return true;
  } else if (currentTurn === "Black" && tilePositionIndex[0] === 7) {
    return true;
  }

  return false;
};
