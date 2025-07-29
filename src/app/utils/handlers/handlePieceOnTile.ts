import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { clearTileHighlights } from "@/app/utils/chessboard/design/clearTileHighlights";
import {
  setPreviouslyClickedTile,
  updateTile,
} from "@/app/redux/slices/chessboard/chessboardSlice";
import { setCurrentPiecePotentialMoves } from "@/app/redux/slices/activeMoves/activeMovesSlice";
import { generateSelectedPieceValidMoves } from "@/app/utils/pieceMovements/generateMoves/generateSelectedPiece";
import { highlightValidMoves } from "@/app/utils/chessboard/design/highlightValidMoves";
import { isKingSafeAfterMove } from "@/app/utils/handlers/helpers/handPieceOnTileHelpers/isKingSafeAfterMove";
import { TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { getKingSpecificMoves } from "./helpers/handPieceOnTileHelpers/getKingSpecificMoves";
import { getValidPieceMoves } from "./helpers/handPieceOnTileHelpers/getValidPieceMoves";

/**
 * Deals with the piece being clicked on the tile
 * @param dispatch Update state in Redux
 * @param clickedTile The current tile that is being clicked
 * @param chessboard Chessboard Object keeping track of the Chess Game
 * @param isInCheck Whether the King piece is in check
 * @param pieceAttackingKing Pieces that are attacking the king
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

  dispatch(
    updateTile({
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

  let validPieceMoves: number[][] = getValidPieceMoves(
    isInCheck,
    attackingPositions,
    validCheckMoves,
    selectedPieceValidMoves
  );

  const kingSpecificMoves: number[][] = getKingSpecificMoves(
    dispatch,
    clickedTile,
    chessboard,
    enemyMoves,
    attackingPositions,
    currentTurn
  );

  let pieceLegalMoves = [...validPieceMoves, ...kingSpecificMoves];
  const enemyTeamColor: "White" | "Black" =
    currentTurn === "White" ? "Black" : "White";

  pieceLegalMoves = pieceLegalMoves.filter(
    ([row, col]) =>
      !isKingSafeAfterMove(
        dispatch,
        chessboard,
        clickedTile,
        chessboard[row][col],
        currentTurn,
        enemyTeamColor
      )
  );

  highlightValidMoves(dispatch, chessboard, pieceLegalMoves, currentTurn);
  dispatch(setCurrentPiecePotentialMoves(pieceLegalMoves));
};
