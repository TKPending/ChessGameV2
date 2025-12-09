import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

import {
  selectCurrentTurn,
  selectGameState,
  selectIsRedoAvaialble,
  selectViewingMode,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  selectCastling,
  selectChessboard,
} from "@/app/utils/selectors/chessboardStateSelectors";

import { findKingPosition } from "@/app/utils/tileChecks/findKingPosition";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { generateAllTeamMoves } from "@/app/utils/generators/generateAllTeamMoves";
import { generateCastlingMoves } from "@/app/utils/generators/generateCastlingMoves";
import { isCastlingPossible } from "@/app/utils/moveChecks/isCastlingPossible";
import { isSquareAttacked } from "@/app/utils/tileChecks/isSquareAttacked";
import { resetUiHighlights } from "@/app/utils/chessboard/resetUiHighlights";
import { setCurrentTeamMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { simulateTeamMoves } from "@/app/utils/simulateTeamMoves";

import { updatePreviousGameState } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import {
  setKingInCheckmate,
  setStalemate,
} from "@/app/redux/slices/gameState/gameStateSlice";

import { GameStateType } from "@/app/types/StateTypes";
import { ChessColors, PieceName } from "@/app/types/ChessTypes";
import { CastleType, EnemyAttackType } from "@/app/types/MoveTypes";
import { TileType } from "@/app/types/ChessTypes";

export const useGameLogic = () => {
  const dispatch: Dispatch<UnknownAction> = useDispatch();
  const chessboard: TileType[][] = useSelector(selectChessboard);

  // Game State
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const isViewing = useSelector(selectViewingMode);
  const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);

  // Game History
  const currentGameState: GameStateType = useSelector(selectGameState);

  const castling: CastleType = useSelector(selectCastling);

  useEffect(() => {
    // Game has ended - Reviewing the board
    if (isViewing) {
      resetUiHighlights(dispatch);
      return;
    }

    // Store previous state for potential undo.
    if (isRedoAvailable) {
      dispatch(updatePreviousGameState(currentGameState));
    }

    // Get all possible moves for current turn team
    const currentTeamMoves: EnemyAttackType[] = generateAllTeamMoves(
      chessboard,
      currentTurn,
      false
    );

    // Simulate moves checking if moves put King in check
    const currentTeamLegalMoves: EnemyAttackType[] = simulateTeamMoves(
      chessboard,
      currentTeamMoves,
      currentTurn
    );
    dispatch(setCurrentTeamMoves(currentTeamLegalMoves));

    // Advanced Moves
    const kingPos: [number, number] | null = findKingPosition(
      chessboard,
      currentTurn
    );

    if (kingPos) {
      let enemyMoves: EnemyAttackType[] | null = null;

      // Castling
      if (isCastlingPossible(chessboard, currentTurn, castling)) {
        enemyMoves = generateAllTeamMoves(
          chessboard,
          getPlayerColor(currentTurn, true),
          true
        );
        const isKingAttacked: boolean = isSquareAttacked(enemyMoves, kingPos);
        if (!isKingAttacked) {
          const castleMoves: number[][] = generateCastlingMoves(
            chessboard,
            enemyMoves,
            currentTurn
          );

          if (castleMoves.length > 0) {
            currentTeamLegalMoves.forEach((pieceMoves: EnemyAttackType) => {
              if (pieceMoves.piece.pieceName === PieceName.king) {
                castleMoves.forEach((castleMove: number[]) => {
                  pieceMoves.moves = [...pieceMoves.moves, castleMove];
                });
              }
            });
          }
        }
      }

      // Must be Checkmate or Stalemate
      if (currentTeamLegalMoves.length === 0) {
        if (!enemyMoves) {
          enemyMoves = generateAllTeamMoves(
            chessboard,
            getPlayerColor(currentTurn, true),
            true
          );
        }

        const attacked: boolean = isSquareAttacked(enemyMoves, kingPos);
        if (attacked) {
          dispatch(setKingInCheckmate(true));
        } else {
          dispatch(setStalemate());
        }
      }
    }
  }, [dispatch, chessboard, currentTurn]);
};
