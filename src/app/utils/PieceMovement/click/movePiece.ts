import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setBoardHistory,
  setCapturedPiece,
  setChessboard,
  setCurrentTurn,
  setMoveHistory,
} from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";

export const movePiece = (
  dispatch: Dispatch<UnknownAction>,
  currentTile: TileType,
  targetTile: TileType,
  currentBoardState: TileType[][]
) => {
  // No piece to move
  if (!currentTile.pieceOnTile) return;

  // Piece Captured
  if (targetTile.pieceOnTile) {
    dispatch(
      setCapturedPiece({
        ...targetTile.pieceOnTile,
        isAlive: false,
      })
    );
  }

  const updatedTargetTile: TileType = {
    ...targetTile,
    pieceOnTile: currentTile.pieceOnTile,
    isHighlighted: false,
  };

  const updatedCurrentTile: TileType = {
    ...currentTile,
    pieceOnTile: null,
    isHighlighted: false,
  };

  // Update Target Tile
  const newBoardState: TileType[][] = currentBoardState.map((row) => {
    return row.map((tile: TileType) =>
      // Find current tile on board
      tile.tilePosition === currentTile.tilePosition
        ? updatedCurrentTile
        : // Find target tile on board
        tile.tilePosition === targetTile.tilePosition
        ? updatedTargetTile
        : // Do nothing (Return exisiting tile)
          tile
    );
  });

  // Save previous game state
  dispatch(setBoardHistory(currentBoardState));
  // Update game moves
  dispatch(
    setMoveHistory({
      from: currentTile,
      to: targetTile,
    })
  );
  // Update game state
  dispatch(setChessboard(newBoardState));
  dispatch(setCurrentTurn());
};
