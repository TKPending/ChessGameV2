import { setChessboard } from "@/app/redux/slices/board/boardSlice";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const updateChessboard = (
  dispatch: Dispatch<UnknownAction>,
  currentChessboard: TileType[][],
  previousClickedTile: TileType,
  targetTile: TileType
): TileType[][] => {
  if (!previousClickedTile.pieceOnTile) return [];

  const pieceToMove: PieceType = previousClickedTile.pieceOnTile;

  const newChessboardState: TileType[][] = currentChessboard.map((row) =>
    row.map((tile) => {
      // Clear piece from the previously clicked tile
      if (tile.tilePosition === previousClickedTile.tilePosition) {
        return { ...tile, pieceOnTile: null, isHighlighted: false };
      }
      // Move piece
      if (tile.tilePosition === targetTile.tilePosition) {
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

  dispatch(setChessboard(newChessboardState));

  return newChessboardState;
};
