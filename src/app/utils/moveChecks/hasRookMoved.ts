import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setRookHasMoved } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { CastleType } from "@/app/types/MoveTypes";
import { ChessColors, TileType } from "@/app/types/ChessTypes";

/**
 * Checks whether a Rook has been moved
 * @param dispatch Update Redux State
 * @param currentTurn Current turn in game
 * @param castleState Checks castling states
 * @param tile Originally clicked Tile
 * @returns Nothings
 */
export const hasRookMoved = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: ChessColors.white | ChessColors.black,
  castleState: CastleType,
  tile: TileType
) => {
  if (!castleState.canCastle) return;

  const rookPosition = tile.tilePosition;

  // Define the starting positions of the rooks
  const whiteQueenSide = "a1";
  const whiteKingSide = "h1";
  const blackQueenSide = "a8";
  const blackKingSide = "h8";

  // Determine which castle option to disable based on the rook's position
  if (currentTurn === "White") {
    if (rookPosition === whiteQueenSide) {
      dispatch(
        setRookHasMoved({
          direction: "queenside",
          currentTurnColor: currentTurn,
        })
      );
    } else if (rookPosition === whiteKingSide) {
      dispatch(
        setRookHasMoved({
          direction: "kingside",
          currentTurnColor: currentTurn,
        })
      );
    }
  } else if (currentTurn === "Black") {
    if (rookPosition === blackQueenSide) {
      dispatch(
        setRookHasMoved({
          direction: "queenside",
          currentTurnColor: currentTurn,
        })
      );
    } else if (rookPosition === blackKingSide) {
      dispatch(
        setRookHasMoved({
          direction: "kingside",
          currentTurnColor: currentTurn,
        })
      );
    }
  }
};
