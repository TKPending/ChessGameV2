import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { CastleType } from "@/app/types/MoveTypes";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { setRookHasMoved } from "@/app/redux/slices/chessboardState/chessboardStateSlice";

/**
 * Checks whether a Rook has been moved
 * @param dispatch Update Redux State
 * @param currentTurn Current turn in game
 * @param castling Checks castling states
 * @param tile Originally clicked Tile
 * @returns Nothings
 */
export const rookMovedPreventCastle = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: ChessColors.white | ChessColors.black,
  castling: CastleType,
  tile: TileType
) => {
  if (!castling[currentTurn === "White" ? "white" : "black"].canCastleOption)
    return;

  const rookPosition = tile.tilePosition;

  // Define the starting positions of the rooks
  const whiteRookLeft = "a1";
  const whiteRookRight = "h1";
  const blackRookLeft = "a8";
  const blackRookRight = "h8";

  // Determine which castle option to disable based on the rook's position
  if (currentTurn === "White") {
    if (rookPosition === whiteRookLeft) {
      dispatch(
        setRookHasMoved({ direction: "left", currentTurnColor: currentTurn })
      );
    } else if (rookPosition === whiteRookRight) {
      dispatch(
        setRookHasMoved({ direction: "right", currentTurnColor: currentTurn })
      );
    }
  } else if (currentTurn === "Black") {
    if (rookPosition === blackRookLeft) {
      dispatch(
        setRookHasMoved({ direction: "left", currentTurnColor: currentTurn })
      );
    } else if (rookPosition === blackRookRight) {
      dispatch(
        setRookHasMoved({ direction: "right", currentTurnColor: currentTurn })
      );
    }
  }
};
