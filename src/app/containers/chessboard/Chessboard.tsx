import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PawnPromotionModal from "@/app/containers/chessboard/features/pawnPromotion/PawnPromotionModal";
import TileContainer from "@/app/containers/chessboard/features/tile/TileContainer";

import {
  selectCastling,
  selectChessboard,
  selectPawnPromotion,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTurn,
  selectGameState,
  selectIsRedoAvaialble,
  selectViewingMode,
  selectPlayers,
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

import {
  PlayerType,
  ChessColors,
  PieceName,
  TileType,
} from "@/app/types/ChessTypes";
import {
  CastleType,
  EnemyAttackType,
  PawnPromotionType,
} from "@/app/types/MoveTypes";
import { GameStateType } from "@/app/types/StateTypes";
import { generateCastlingMoves } from "./utils/pieceMovements/castling/generateCastlingMoves";
import { isCastlingPossible } from "./utils/pieceMovements/castling/isCastlingPossible";

const Chessboard = () => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(selectChessboard);
  const players: PlayerType[] = useSelector(selectPlayers);
  const pawnPromotion: PawnPromotionType = useSelector(selectPawnPromotion);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const currentGameState: GameStateType = useSelector(selectGameState);
  const castling: CastleType = useSelector(selectCastling);
  const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);
  const isViewing = useSelector(selectViewingMode);

  useEffect(() => {
    // If the board hasn't been initialised yet, generate tiles
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
      return;
    }

    if (isViewing) {
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

    // Advanced Moves
    const kingPos: [number, number] | null = findKingPosition(
      chessboard,
      currentTurn
    );
    if (!kingPos) {
      return;
    }

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
                pieceMoves.moves.push(castleMove);
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

    dispatch(setCurrentTeamMoves(currentTeamLegalMoves));
  }, [chessboard, currentTurn]);

  return (
    <div className="h-auto w-full flex items-center justify-center">
      {/* Pawn promotion is possible */}
      {pawnPromotion.isPawnPromotion && <PawnPromotionModal />}
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
