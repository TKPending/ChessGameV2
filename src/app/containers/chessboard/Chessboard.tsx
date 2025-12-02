import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PawnPromotionContainer from "@/app/containers/chessboard/features/pawnPromotion/PawnPromotionContainer";
import TileContainer from "@/app/containers/chessboard/features/tile/TileContainer";

import {
  selectChessboard,
  selectPawnPromotion,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTurn,
  selectGameState,
  selectIsRedoAvaialble,
} from "@/app/utils/selectors/gameStateSelectors";
import { updatePreviousGameState } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";

import { generateTiles } from "@/app/containers/chessboard/utils/chessboard/generateTiles";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { generateAllTeamMoves } from "./utils/pieceMovements/generateMoves/generateAllTeamMoves";
import { simulateTeamMoves } from "./utils/pieceMovements/generateMoves/helper/simulateTeamMoves";
import { setCurrentTeamMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { isSquareAttacked } from "./utils/pieceMovements/helpers/isSquareAttacked";
import { findKingPosition } from "./utils/pieceMovements/helpers/findKingPosition";
import {
  setKingInCheckmate,
  setStalemate,
} from "@/app/redux/slices/gameState/gameStateSlice";

import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType, PawnPromotionType } from "@/app/types/MoveTypes";
import { GameStateType } from "@/app/types/StateTypes";

const Chessboard = () => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(selectChessboard);
  const pawnPromotion: PawnPromotionType = useSelector(selectPawnPromotion);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const currentGameState: GameStateType = useSelector(selectGameState);
  const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);

  useEffect(() => {
    // If the board hasn't been initialised yet, generate tiles
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
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

    // Must be Checkmate or Stalemate
    if (currentTeamLegalMoves.length === 0) {
      const enemyMoves: EnemyAttackType[] = generateAllTeamMoves(
        chessboard,
        getPlayerColor(currentTurn, true),
        true
      );
      const kingPos: [number, number] | null = findKingPosition(
        chessboard,
        currentTurn
      );
      const isKingAttacked: boolean = kingPos
        ? isSquareAttacked(enemyMoves, kingPos)
        : false;
      if (isKingAttacked) {
        dispatch(setKingInCheckmate(true));
      } else {
        dispatch(setStalemate());
      }
    }

    dispatch(setCurrentTeamMoves(currentTeamLegalMoves));
  }, [chessboard, currentTurn]);

  return (
    <div className="h-auto w-full flex items-center justify-center">
      {/* Pawn promotion is possible */}
      {pawnPromotion.isPawnPromotion && <PawnPromotionContainer />}
      {/* Render Chessboard */}
      <div className="h-full w-full chessboard">
        {chessboard.map((row: TileType[], rowIndex: number) =>
          row.map((tile: TileType, colIndex: number) => (
            <TileContainer key={`${rowIndex}-${colIndex}`} tile={tile} />
          ))
        )}
      </div>
    </div>
  );
};

export default Chessboard;
