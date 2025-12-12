import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { findKingPosition } from "@/app/utils/tileChecks/findKingPosition";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { CastleType } from "@/app/types/MoveTypes";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";

/**
 * Update the Chessboard when a move is made
 * @param dispatch Update redux state
 * @param currentChessboard Board state before the move
 * @param previousClickedTile Originally clicked tile
 * @param targetTile Tile piece is moving to
 * @returns A new board state, with piece in updated position & Removes highlights
 */
export const updateChessboard = (
  dispatch: Dispatch<UnknownAction>,
  currentChessboard: TileType[][],
  previousClickedTile: TileType,
  targetTile: TileType,
  castleState: CastleType
): TileType[][] => {
  if (!previousClickedTile.pieceOnTile) return [];

  const pieceToMove: PieceType = previousClickedTile.pieceOnTile;
  const currentTurn: ChessColors = pieceToMove.pieceColor;

  const canCastle: boolean = castleState.canCastle;

  const kingPos = findKingPosition(currentChessboard, currentTurn);
  if (!kingPos) return [];

  const kingRow = kingPos[0];
  const kingSideRookPos: [number, number] = [kingRow, 7];
  const queenSideRookPos: [number, number] = [kingRow, 0];

  const [targetRow, targetCol] = convertTilePosition(targetTile.tilePosition);

  let rookFrom: [number, number] | null = null;
  let rookTo: [number, number] | null = null;
  let isCastling = false;

  if (canCastle) {
    if (targetRow === kingRow && targetCol === 6) {
      isCastling = true;
      rookFrom = kingSideRookPos;
      rookTo = [kingRow, 5];
    }

    if (targetRow === kingRow && targetCol === 1) {
      isCastling = true;
      rookFrom = queenSideRookPos;
      rookTo = [kingRow, 2];
    }
  }

  const newChessboardState: TileType[][] = currentChessboard.map((row) =>
    row.map((tile) => {
      const pos: string = tile.tilePosition;

      if (pos === previousClickedTile.tilePosition) {
        return { ...tile, pieceOnTile: null };
      }

      if (pos === targetTile.tilePosition) {
        return {
          ...tile,
          pieceOnTile: pieceToMove,
        };
      }
      if (isCastling && rookFrom && rookTo) {
        const posIdx: [number, number] = convertTilePosition(pos);
        if (posIdx[0] === rookFrom[0] && posIdx[1] === rookFrom[1]) {
          return { ...tile, pieceOnTile: null };
        }
        if (posIdx[0] === rookTo[0] && posIdx[1] === rookTo[1]) {
          return {
            ...tile,
            pieceOnTile:
              currentChessboard[rookFrom[0]][rookFrom[1]].pieceOnTile,
          };
        }
      }

      return { ...tile };
    })
  );

  dispatch(setChessboard(newChessboardState));
  return newChessboardState;
};
