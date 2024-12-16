import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import Tile from "@/app/components/game/Tile";
import {
  setChessboard,
  setEnemyMoves,
} from "@/app/redux/slices/board/boardSlice";
import { generateTiles } from "@/app/utils/generateTiles";
import { generateEnemyMoves } from "@/app/utils/moveLogic/generateEnemyMoves";

const ChessboardContainer = () => {
  const dispatch = useDispatch();
  const chessboard = useSelector((state: RootState) => state.board.chessboard);
  const currentTurn = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const enemyMoves = useSelector((state: RootState) => state.board.enemyMoves);

  useEffect(() => {
    if (chessboard.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }

    if (chessboard.length > 0 && enemyMoves.length === 0) {
      console.log({ currentTurn });
      const moves = generateEnemyMoves(dispatch, chessboard, currentTurn);

      dispatch(setEnemyMoves(moves));
    }
  }, [chessboard, currentTurn, enemyMoves, dispatch]);

  return (
    <div className="grid grid-cols-8 grid-rows-8 aspect-square w-full max-w-[80%] max-h-[80%] bg-gray-700">
      {chessboard.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} tile={tile} />
        ))
      )}
    </div>
  );
};

export default ChessboardContainer;
