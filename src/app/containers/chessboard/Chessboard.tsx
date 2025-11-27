import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setEnemyMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { generateTiles } from "@/app/containers/chessboard/utils/chessboard/generateTiles";
import { checkForCheckmate } from "@/app/containers/chessboard/utils/pieceMovements/checkmate/checkForCheckmate";
import EndGameModal from "@/app/containers/features/endGame/EndGameModal";
import PawnPromotionContainer from "@/app/containers/chessboard/features/pawnPromotion/PawnPromotionContainer";
import TileContainer from "@/app/containers/chessboard/features/tile/TileContainer";

import { getPlayerColor } from "@/app/utils/getPlayerColor";

import {
  selectChessboard,
  selectPawnPromotion,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectCurrentTurn,
  selectGameState,
  selectIsKingInCheckmate,
  selectIsRedoAvaialble,
  selectStalemate,
  selectWinner,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  selectAllEnemyMoves,
  selectIsKingInCheck,
} from "@/app/utils/selectors/moveAnalysisStateSelector";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import { updatePreviousGameState } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";

import { ChessColors, PlayerType, TileType } from "@/app/types/ChessTypes";
import { EnemyAttackType, PawnPromotionType } from "@/app/types/MoveTypes";
import { generateAllTeamMoves } from "./utils/pieceMovements/generateMoves/generateAllTeamMoves";
import { stalemate } from "./utils/pieceMovements/stalemate/stalemate";

const Chessboard = () => {
  // const dispatch = useDispatch();
  // const chessboard: TileType[][] = useSelector(selectChessboard);
  // const pawnPromotion: PawnPromotionType = useSelector(selectPawnPromotion);
  // const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  // const allEnemyMoves: EnemyAttackType[] = useSelector(selectAllEnemyMoves);
  // const isKingInCheck: boolean = useSelector(selectIsKingInCheck);
  // const currentMoveCount: number = useSelector(selectCurrentMoveCount);
  // const currentGameState = useSelector(selectGameState);
  // const isRedoAvailable: boolean = useSelector(selectIsRedoAvaialble);
  // End Game
  // const isWinner: PlayerType | null = useSelector(selectWinner);
  // const isKingInCheckmate: boolean = useSelector(selectIsKingInCheckmate);
  // const isStalemate: boolean = useSelector(selectStalemate);

  // useEffect(() => {
  //   // If the board hasn't been initialised yet, generate tiles
  //   if (chessboard.length === 0) {
  //     dispatch(setChessboard(generateTiles()));
  //   }

  //   // Store previous state for potential undo.
  //   if (isRedoAvailable) {
  //     dispatch(updatePreviousGameState(currentGameState));
  //   }

  //   // Simulate moves once the board has more than 3 moves to avoid unnecessary calculations
  //   if (
  //     chessboard.length > 0 &&
  //     allEnemyMoves.length === 0 &&
  //     currentMoveCount > 3
  //   ) {
  //     const enemyColor: ChessColors = getPlayerColor(currentTurn, true);

  //     const isSimulatingEnemyMoves: boolean = false;

  //     // Generate all possible enemy moves and check for checkmate
  //     const enemyLegalMoves: EnemyAttackType[] = generateAllTeamMoves(
  //       dispatch,
  //       chessboard,
  //       enemyColor,
  //       isSimulatingEnemyMoves
  //     );
  //     checkForCheckmate(dispatch, chessboard, enemyLegalMoves, currentTurn);

  //     // Store enemy moves
  //     dispatch(setEnemyMoves(enemyLegalMoves));
  //   }
  //   stalemate(dispatch, chessboard, currentTurn, allEnemyMoves, isKingInCheck);
  // }, [
  //   chessboard,
  //   currentTurn,
  //   allEnemyMoves,
  //   isKingInCheck,
  //   dispatch,
  //   isKingInCheckmate,
  // ]);

  return (
    <div className="h-auto w-full flex items-center justify-center">
      {/* Pawn promotion is possible */}
      {/* {pawnPromotion.isPawnPromotion && <PawnPromotionContainer />} */}
      {/* Render Chessboard */}
      {/* <div className="h-full w-full chessboard">
        {chessboard.map((row: TileType[], rowIndex: number) =>
          row.map((tile: TileType, colIndex: number) => (
            <TileContainer key={`${rowIndex}-${colIndex}`} tile={tile} />
          ))
        )}
      </div> */}
    </div>
  );
};

export default Chessboard;
