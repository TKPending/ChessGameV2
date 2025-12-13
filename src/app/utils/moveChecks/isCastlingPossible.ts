import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { CastleType } from "@/app/types/MoveTypes";

export const isCastlingPossible = (
  chessboard: TileType[][],
  currentTurn: ChessColors,
  castleState: CastleType
): boolean => {
  if (!castleState.queenSideCastling && !castleState.kingSideCastling) {
    return false;
  }

  const kingRow: number = currentTurn === ChessColors.white ? 7 : 0;

  const queensideClear =
    chessboard[kingRow][1].pieceOnTile === null &&
    chessboard[kingRow][2].pieceOnTile === null &&
    chessboard[kingRow][3].pieceOnTile === null;

  const kingsideClear =
    chessboard[kingRow][5].pieceOnTile === null &&
    chessboard[kingRow][6].pieceOnTile === null;

  return queensideClear || kingsideClear;
};
