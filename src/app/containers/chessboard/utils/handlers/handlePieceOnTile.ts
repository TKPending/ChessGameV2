import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { clearTileHighlights } from "@/app/containers/chessboard/utils/chessboard/design/clearTileHighlights";
import {
  setPreviousTile,
  updateTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setCurrentPiecePotentialMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { generateSelectedPieceValidMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateSelectedPiece";
import { highlightValidMoves } from "@/app/containers/chessboard/utils/chessboard/design/highlightValidMoves";
import { isKingSafeAfterMove } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/isKingSafeAfterMove";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { getKingSpecificMoves } from "./helpers/handPieceOnTileHelpers/getKingSpecificMoves";
import { getValidPieceMoves } from "./helpers/handPieceOnTileHelpers/getValidPieceMoves";
import { getPlayerColor } from "@/app/utils/getPlayerColor";

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
  currentTurn: ChessColors.white | ChessColors.black
) => {
  clearTileHighlights(dispatch, chessboard);

  dispatch(
    updateTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected",
    })
  );

  dispatch(setPreviousTile(clickedTile));

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
  const enemyTeamColor: ChessColors.black | ChessColors.white = getPlayerColor(
    currentTurn,
    true
  );

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
