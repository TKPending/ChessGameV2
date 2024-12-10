import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setCurrentTile,
  setPreviousTile,
} from "@/app/redux/slices/tile/tileSlice";
import { setTile } from "@/app/redux/slices/board/boardSlice";
import { firstTileClick } from "./click/firstTileClick";
import { clearHighlights } from "./clearHighlight";
import { movePiece } from "./click/movePiece";
import { isValidMove } from "./isValidMove";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "@/app/types/PieceType";

const resetTiles = (dispatch: Dispatch<UnknownAction>) => {
  dispatch(setCurrentTile(null));
  dispatch(setPreviousTile(null));
};

export const tileClickedProcess = (
  dispatch: Dispatch<UnknownAction>,
  currentBoardState: TileType[][],
  currentTile: TileType | null,
  clickedTile: TileType,
  previousTile: TileType | null,
  currentTurn: "White" | "Black"
) => {
  const currentPieceColor: "White" | "Black" | null =
    clickedTile.pieceOnTile?.pieceColor || null;
  const piece: PieceType | null = clickedTile.pieceOnTile;
  const pieceColor: "White" | "Black" | undefined = piece?.pieceColor;

  // Clicking on the same tile
  if (clickedTile === currentTile) {
    resetTiles(dispatch);
    return;
  }

  firstTileClick(dispatch, piece, currentTile, clickedTile, currentTurn);

  // User clicked on another of their pieces
  if (pieceColor === currentTurn) {
    clearHighlights(dispatch, currentBoardState);
    dispatch(setTile({ tile: { ...clickedTile, isHighlighted: true } }));
    return;
  }

  // Move Piece
  if (pieceColor !== currentTurn || !currentTile?.pieceOnTile) {
    if (!currentTile) return;
    if (isValidMove(piece, currentTile, clickedTile, currentBoardState)) {
      movePiece(dispatch, currentTile, clickedTile, currentBoardState);
      resetTiles(dispatch);
    }
  }
};
