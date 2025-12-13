import { setKingHasMoved } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { ChessColors } from "@/app/types/ChessTypes";
import { CastleType } from "@/app/types/MoveTypes";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

// TODO: Might need to change this function to search for the King

/**
 * Checks whether the King has moved
 * @param dispatch Update redux state
 * @param currentTurn Current turn in game
 * @param castleState Whether castling is allowed or not
 * @returns Nothing
 */
export const hasKingMoved = (
  dispatch: Dispatch<UnknownAction>,
  currentTurn: ChessColors.white | ChessColors.black,
  castleState: CastleType
) => {
  if (!castleState.canCastle) return;

  dispatch(setKingHasMoved(currentTurn));
};
