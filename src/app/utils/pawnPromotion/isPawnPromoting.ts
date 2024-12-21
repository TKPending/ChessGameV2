import { convertTilePosition } from "@/app/utils/chessboard/convertTilePosition";

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
