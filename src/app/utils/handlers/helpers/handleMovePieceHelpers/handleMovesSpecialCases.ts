import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { kingMovedPreventCastle } from "./kingMovedPreventCastle";
import { rookMovedPreventCastle } from "./rookMovedPreventCastle";
import { isPawnPromotion } from "@/app/utils/pawnPromotion/isPawnPromoting";
import { setPawnPromotion } from "@/app/redux/slices/board/boardSlice";
import { CastleType } from "@/app/types/CastleType";
import { PieceName, PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

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
