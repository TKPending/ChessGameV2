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

export const movePiece = (
  dispatch: Dispatch<UnknownAction>,
  previousClickedTile: TileType | null,
  targetTile: TileType,
  currentBoardState: TileType[][]
) => {
  // No piece to move
  if (!previousClickedTile?.pieceOnTile) return [];

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
          pieceOnTile: previousClickedTile.pieceOnTile,
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
