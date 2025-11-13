import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { clearTileHighlights } from "@/app/containers/chessboard/utils/chessboard/design/clearTileHighlights";
import {
  updateTile,
  setPreviousTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { generateSelectedPieceValidMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateSelectedPiece";
import { getValidPieceMoves } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/getValidPieceMoves";
import { getKingSpecificMoves } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/getKingSpecificMoves";
import { isKingSafeAfterMove } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/isKingSafeAfterMove";
import { highlightValidMoves } from "@/app/containers/chessboard/utils/chessboard/design/highlightValidMoves";
import { setCurrentPiecePotentialMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType } from "@/app/types/MoveTypes";

export const tileClickHandler = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentTurn: ChessColors,
  clickedTile: TileType,
  isInCheck: boolean,
  pieceAttackingKing: EnemyAttackType[],
  validCheckMoves: number[][],
  enemyMoves: EnemyAttackType[]
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
