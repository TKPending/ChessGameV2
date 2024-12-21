import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { clearTileHighlights } from "@/app/utils/chessboard/design/clearTileHighlights";
import {
  setPreviouslyClickedTile,
  setSpecificTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { filterCastleMoves } from "./helpers/handPieceOnTileHelpers/filterCastleMoves";
import { filterKingSafeMoves } from "./helpers/handPieceOnTileHelpers/filterKingSafeMoves";
import { generateSelectedPieceValidMoves } from "@/app/utils/pieceMovements/generateMoves/generateSelectedPieceValidMoves";
import { highlightValidMoves } from "@/app/utils/chessboard/design/highlightValidMoves";
import { filterMovesToAvoidCheck } from "@/app/utils/handlers/helpers/handPieceOnTileHelpers/filterMovesToAvoidCheck";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { PieceName } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

export const handlePieceOnTile = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  validCheckMoves: number[][],
  enemyMoves: EnemyAttackType[],
  currentTurn: "White" | "Black"
) => {
  clearTileHighlights(dispatch, chessboard);

  const pieceName: PieceName | undefined = clickedTile.pieceOnTile?.pieceName;

  dispatch(
    setSpecificTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected",
    })
  );

  dispatch(setPreviouslyClickedTile(clickedTile));

  const selectedPieceValidMoves: number[][] = generateSelectedPieceValidMoves(
    dispatch,
    chessboard,
    clickedTile,
    enemyMoves
  );

  const validPieceMoves = isInCheck
    ? filterMovesToAvoidCheck(selectedPieceValidMoves, validCheckMoves)
    : selectedPieceValidMoves;

  let kingSpecificMoves: number[][] = [];
  if (pieceName === "King") {
    const kingCastleMoves: number[][] = filterCastleMoves(
      chessboard,
      clickedTile,
      enemyMoves,
      currentTurn
    );

    const kingSafeMoves: number[][] = filterKingSafeMoves(
      dispatch,
      chessboard,
      clickedTile,
      enemyMoves
    );

    kingSpecificMoves = [...kingCastleMoves, ...kingSafeMoves];
  }

  const validMoves = [...validPieceMoves, ...kingSpecificMoves];

  highlightValidMoves(dispatch, chessboard, validMoves, currentTurn);
  dispatch(setValidMoves(validMoves));
};
