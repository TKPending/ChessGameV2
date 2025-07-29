import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setChessboard } from "@/app/redux/slices/chessboard/chessboardSlice";
import { TileType, PieceType } from "@/app/types/ChessTypes";

/**
 * Update the Chessboard when a move is made
 * @param dispatch Update redux state
 * @param currentChessboard Board state before the move
 * @param previousClickedTile Originally clicked tile
 * @param targetTile Tile piece is moving to
 * @returns A new board state, with piece in updated position & Removes highlights
 */
export const updateChessboard = (
  currentChessboard: TileType[][],
  previousClickedTile: TileType,
  targetTile: TileType,
  simulation: boolean,
  dispatch?: Dispatch<UnknownAction>
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

  if (!simulation && dispatch) {
    dispatch(setChessboard(newChessboardState));
  }

  return newChessboardState;
};
