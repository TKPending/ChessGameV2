import { ChessColors } from "@/app/types/ChessTypes";

export const getPlayerColor = (
  color: ChessColors.white | ChessColors.black,
  enemyColor?: boolean
) => {
  if (enemyColor) {
    return color === ChessColors.white ? ChessColors.black : ChessColors.white;
  } else {
    return color;
  }
};
