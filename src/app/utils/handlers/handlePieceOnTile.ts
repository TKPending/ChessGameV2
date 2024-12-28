import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { clearTileHighlights } from "@/app/utils/chessboard/design/clearTileHighlights";
import {
  setPreviouslyClickedTile,
  setSpecificTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import { filterCastleMoves } from "./helpers/handPieceOnTileHelpers/filterCastleMoves";
import { filterKingSafeMoves } from "./helpers/handPieceOnTileHelpers/filterKingSafeMoves";
import { generateSelectedPieceValidMoves } from "@/app/utils/pieceMovements/generateMoves/generateSelectedPiece";
import { highlightValidMoves } from "@/app/utils/chessboard/design/highlightValidMoves";
import { simulateMove } from "../simulation/simulateMove";
import { filterMovesToAvoidCheck } from "@/app/utils/handlers/helpers/handPieceOnTileHelpers/filterMovesToAvoidCheck";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { PieceName } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

/**
 * Deals with the piece being clicked on the tile
 * @param dispatch Update state in Redux
 * @param clickedTile The current tile that is being clicked
 * @param chessboard Chessboard Object keeping track of the Chess Game
 * @param isInCheck Whether the King piece is in check
 * @param validCheckMoves Valid moves that can be made
 * @param enemyMoves All enemy moves that can be made
 * @param currentTurn The current turn
 */
export const handlePieceOnTile = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][],
  isInCheck: boolean,
  pieceAttackingKing: EnemyAttackType[],
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

  const attackingPositions = pieceAttackingKing.map(
    (piece) => piece.piecePosition
  );

  let validPieceMoves: number[][];
  if (isInCheck) {
    const preventCheckMoves = [...attackingPositions, ...validCheckMoves];
    validPieceMoves = filterMovesToAvoidCheck(
      selectedPieceValidMoves,
      preventCheckMoves
    );
  } else {
    validPieceMoves = selectedPieceValidMoves;
  }

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
      enemyMoves,
      attackingPositions
    );

    kingSpecificMoves = [...kingCastleMoves, ...kingSafeMoves];
  }

  let validMoves = [...validPieceMoves, ...kingSpecificMoves];

  validMoves = validMoves.filter(
    ([row, col]) =>
      !simulateMove(
        dispatch,
        chessboard,
        clickedTile,
        chessboard[row][col],
        currentTurn
      )
  );

  highlightValidMoves(dispatch, chessboard, validMoves, currentTurn);
  dispatch(setValidMoves(validMoves));
};
