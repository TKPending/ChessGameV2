import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setChessboard,
  setEnemyMoves,
  setPlayerCapturedPiece,
} from "@/app/redux/slices/board/boardSlice";
import {
  setChessboardHistory,
  setMoveHistory,
} from "@/app/redux/slices/gameHistory/gameHistorySlice";
import { TileType } from "@/app/types/TileType";
import { CastleType } from "../types/castleType";
import { PieceType } from "../types/PieceType";
import { kingMovedPreventCastle } from "./castleLogic/kingMovedPreventCastle";
import { rookMovedPreventCastle } from "./castleLogic/rookMovedPreventCastle";

export const movePiece = (
  dispatch: Dispatch<UnknownAction>,
  previousClickedTile: TileType | null,
  targetTile: TileType,
  currentBoardState: TileType[][],
  castling: CastleType
) => {
  // No piece to move
  if (!previousClickedTile?.pieceOnTile) return [];

  const pieceToMove: PieceType = previousClickedTile.pieceOnTile;
  const currentTurn: "White" | "Black" = pieceToMove.pieceColor;
  const castleColor: "white" | "black" =
    currentTurn === "White" ? "white" : "black";

  if (pieceToMove.pieceName === "King") {
    kingMovedPreventCastle(dispatch, castleColor, castling);
  }

  if (pieceToMove.pieceName === "Rook") {
    rookMovedPreventCastle(
      dispatch,
      castleColor,
      castling,
      previousClickedTile
    );
  }

  console.log(castling);

  // Capture logic
  if (targetTile.pieceOnTile) {
    dispatch(
      setPlayerCapturedPiece({
        ...targetTile.pieceOnTile,
        isAlive: false,
      })
    );
  }

  // Update the board
  const newBoardState: TileType[][] = currentBoardState.map((row) =>
    row.map((tile) => {
      if (tile.tilePosition === previousClickedTile.tilePosition) {
        // Clear piece from the previously clicked tile
        return { ...tile, pieceOnTile: null, isHighlighted: false };
      }
      if (tile.tilePosition === targetTile.tilePosition) {
        // Move piece to the target tile
        return {
          ...tile,
          pieceOnTile: pieceToMove,
          isHighlighted: false,
        };
      }
      // Leave other tiles unchanged
      return { ...tile, isHighlighted: false };
    })
  );

  // Save previous game state
  dispatch(setChessboardHistory(currentBoardState));

  // Update move history
  dispatch(
    setMoveHistory({
      from: previousClickedTile,
      to: targetTile,
    })
  );

  // Update the board state in Redux
  dispatch(setChessboard(newBoardState));
  return newBoardState;
};
