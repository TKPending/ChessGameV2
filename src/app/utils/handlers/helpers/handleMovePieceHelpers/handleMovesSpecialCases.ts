import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { kingMovedPreventCastle } from "./kingMovedPreventCastle";
import { rookMovedPreventCastle } from "./rookMovedPreventCastle";
import { isPawnPromotion } from "@/app/utils/pawnPromotion/isPawnPromoting";
import { setPawnPromotion } from "@/app/redux/slices/old/board/boardSlice";
import { CastleType } from "@/app/types/CastleType";
import { PieceName, PieceType } from "@/app/types/PieceTypes";
import { TileType } from "@/app/types/TileType";

/**
 * Handles King castling and Pawn Promotion checks.
 * @param dispatch Update redux state
 * @param piece Piece that is going through the check
 * @param targetTile Tile the piece is looking to move to
 * @param previousClickedTile Originally clicked tile
 * @param currentTurn Current turn in the game
 * @param castling Whether castling is around
 */
export const handleMovesSpecialCases = (
  dispatch: Dispatch<UnknownAction>,
  piece: PieceType,
  targetTile: TileType,
  previousClickedTile: TileType,
  currentTurn: "White" | "Black",
  castling: CastleType
) => {
  const pieceName: PieceName = piece.pieceName;

  if (pieceName === "King") {
    kingMovedPreventCastle(dispatch, currentTurn, castling);
  }

  if (pieceName === "Rook") {
    rookMovedPreventCastle(
      dispatch,
      currentTurn,
      castling,
      previousClickedTile
    );
  }

  if (pieceName === "Pawn") {
    if (isPawnPromotion(targetTile.tilePosition, currentTurn)) {
      dispatch(setPawnPromotion({ isPromotion: true, targetTile }));
    }
  }
};
