import { setSpecificTile } from "@/app/redux/slices/board/boardSlice";
import { convertTilePosition } from "@/app/utils/convertTilePosition";
import { PieceType, PieceName } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const chessboardSearch = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  defaultMoves: [number, number][],
  pieceToMoveColor: "White" | "Black"
) => {
  const pieceValidMoves: [number, number][] = [];

  defaultMoves.forEach(([targetRow, targetCol]) => {
    if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
      const targetTile: TileType = chessboard[targetRow][targetCol];
      const enemyPiece: PieceType | null = targetTile.pieceOnTile;

      if (!enemyPiece || enemyPiece.pieceColor !== pieceToMoveColor) {
        pieceValidMoves.push([targetRow, targetCol]);
        const enemyOrEmpty: "friendly" | "enemy" = enemyPiece
          ? "enemy"
          : "friendly";
        dispatch(
          setSpecificTile({
            ...targetTile,
            isHighlighted: true,
            highlightReason: enemyOrEmpty,
          })
        );
      } else {
        dispatch(setSpecificTile({ ...targetTile, isHighlighted: false }));
      }
    }
  });

  return pieceValidMoves;
};

export const generatePieceMovements = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  previousClickedTile: TileType | null
): [number, number][] => {
  const pieceToMoveColor: "White" | "Black" | undefined =
    previousClickedTile?.pieceOnTile?.pieceColor;
  if (!pieceToMoveColor || !previousClickedTile?.pieceOnTile) return [];

  const pieceName: PieceName = previousClickedTile.pieceOnTile.pieceName;
  const [currentRow, currentCol] = convertTilePosition(
    previousClickedTile.tilePosition
  );

  switch (pieceName) {
    case PieceName.pawn:
      const direction: number = pieceToMoveColor === "White" ? -1 : 1;
      const forward: [number, number] = [currentRow + direction, currentCol];
      const doubleForward: [number, number] = [
        currentRow + 2 * direction,
        currentCol,
      ];
      const pawnDefaultMoves: [number, number][] = [forward, doubleForward];

      return chessboardSearch(
        dispatch,
        chessboard,
        pawnDefaultMoves,
        pieceToMoveColor
      );
    case PieceName.knight:
      return [];
    case PieceName.bishop:
      return [];
    case PieceName.rook:
      return [];
    case PieceName.queen:
      return [];
    case PieceName.king:
      return [];
    default:
      return [];
  }
};
