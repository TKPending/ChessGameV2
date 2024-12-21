import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TileType } from "@/app/types/TileType";
import { clearHighlights } from "@/app/utils/clearHighlight";
import {
  setPreviouslyClickedTile,
  setSpecificTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { generateValidMoves } from "./generateValidMoves";
import { highlightValidMoves } from "./highlightValidMoves";
import { isInCheckFilter } from "./isInCheckFilter";
import { canCastle } from "./castleLogic/canCastle";
import { EnemyAttackType } from "../types/EnemyAttackType";
import { convertTilePosition } from "./convertTilePosition";
import { kingSafeMoves } from "./kingSafeMoves";
import { PieceName } from "../types/PieceType";

export const handleClickedPiece = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  validCheckMoves: number[][],
  enemyMoves: EnemyAttackType[],
  currentTurn: "White" | "Black"
) => {
  clearHighlights(dispatch, chessboard);
  const tileConversion: [number, number] = convertTilePosition(
    clickedTile.tilePosition
  );
  const pieceOnTileName: PieceName | undefined =
    clickedTile.pieceOnTile?.pieceName;
  let castleLeftMove: [number, number] = [tileConversion[0], 0];
  let castleRightMove: [number, number] = [tileConversion[0], 7];
  let castleMoves: number[][] = [];

  dispatch(
    setSpecificTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected", // Blue
    })
  );

  dispatch(setPreviouslyClickedTile(clickedTile));

  if (pieceOnTileName === "King") {
    const { canCastleLeft, canCastleRight } = canCastle(
      chessboard,
      enemyMoves,
      currentTurn
    );

    if (canCastleLeft) {
      castleMoves.push(castleLeftMove);
    }
    if (canCastleRight) {
      castleMoves.push(castleRightMove);
    }
  }

  // Generate the valid moves for the selected piece
  const pieceValidMoves: number[][] = generateValidMoves(
    dispatch,
    chessboard,
    clickedTile,
    enemyMoves
  );

  // Filter moves if the King is in check
  const filteredMoves = isInCheck
    ? isInCheckFilter(pieceValidMoves, validCheckMoves)
    : pieceValidMoves;

  let kingMoves: [number, number][] = [];
  if (pieceOnTileName === "King") {
    kingMoves = kingSafeMoves(dispatch, chessboard, clickedTile, enemyMoves);
  }

  const validMoves = [...castleMoves, ...filteredMoves, ...kingMoves];

  // Highlight and dispatch the filtered moves
  highlightValidMoves(dispatch, chessboard, validMoves, currentTurn);
  // @ts-ignore
  dispatch(setValidMoves(validMoves));
};
