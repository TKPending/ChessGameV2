import { ChessColors } from "@/app/types/ChessTypes";

/***
 * Return the color of a team
 * @param color Current Turn Color
 * @param enemyColor Get the enemy color
 */

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
