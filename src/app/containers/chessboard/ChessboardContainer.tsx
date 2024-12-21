import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import Tile from "@/app/components/game/Tile";
import {
  setChessboard,
  setEnemyMoves,
} from "@/app/redux/slices/board/boardSlice";
import { generateTiles } from "@/app/utils/chessboard/generateTiles";
import { generateEnemyMoves } from "@/app/utils/pieceMovements/generateMoves/generateEnemyMoves";
import { isKingInCheckmate } from "@/app/utils/pieceMovements/checkmate/isKingInCheckmate";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import PawnPromotionContainer from "./PawnPromotionContainer";

const ChessboardContainer = () => {
  const dispatch = useDispatch();
  const chessboard = useSelector((state: RootState) => state.board.chessboard);
  const currentTurn = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const enemyMoves = useSelector((state: RootState) => state.board.enemyMoves);
  const boardMoves: number = useSelector(
    (state: RootState) => state.gameHistory.count
  );

  const isInCheckmate: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheckmate
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheck
  );
  const pawnPromotion = useSelector(
    (state: RootState) => state.board.pawnPromotion
  );

  useEffect(() => {
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }

    if (chessboard.length > 0 && enemyMoves.length === 0 && boardMoves > 3) {
      const oppositeColor: "White" | "Black" =
        currentTurn === "White" ? "Black" : "White";

      const moves: EnemyAttackType[] = generateEnemyMoves(
        dispatch,
        chessboard,
        oppositeColor
      );
      isKingInCheckmate(dispatch, chessboard, moves, currentTurn);

      dispatch(setEnemyMoves(moves));
    }
  }, [chessboard, currentTurn, enemyMoves, dispatch]);

  useEffect(() => {
    if (isInCheckmate) {
      console.log(`${currentTurn} King is in Checkmate`);
    } else if (isInCheck) {
      console.log(`${currentTurn} King is in Check`);
    }

    if (pawnPromotion.isPawnPromotion) {
    }
  }, [isInCheckmate, isInCheck, pawnPromotion]);

  return (
    <div className="grid grid-cols-8 grid-rows-8 aspect-square w-full max-w-[80%] max-h-[80%] bg-gray-700">
      {pawnPromotion.isPawnPromotion && (
        <PawnPromotionContainer currentTurn={currentTurn} />
      )}
      {chessboard.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} tile={tile} />
        ))
      )}
    </div>
  );
};

export default ChessboardContainer;
