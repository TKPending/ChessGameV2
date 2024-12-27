import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setMoveCounter } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import {
  setCurrentTurn,
  setEnemyMoves,
} from "@/app/redux/slices/board/boardSlice";
import Piece from "./Piece";
import { handleMovePiece } from "@/app/utils/handlers/handleMovePiece";
import { isMoveValid } from "@/app/utils/pieceMovements/helpers/isMoveValid";
import { handlePieceOnTile } from "@/app/utils/handlers/handlePieceOnTile";
import { getTileBackgroundColor } from "@/app/utils/chessboard/design/getTileBackgroundColor";
import { resetTiles } from "@/app/utils/chessboard/design/resetTiles";
import { CastleType } from "@/app/types/CastleType";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

type Props = {
  tile: TileType;
};

const Tile = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(
    (state: RootState) => state.board.chessboard
  );
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const previousClickedTile: TileType | null = useSelector(
    (state: RootState) => state.board.previousClickedTile
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheck
  );
  const validMoves: number[][] = useSelector(
    (state: RootState) => state.board.piecePotentialMoves
  );
  const validCheckMoves: number[][] = useSelector(
    (state: RootState) => state.board.validCheckMoves
  );
  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;
  const enemyMoves: EnemyAttackType[] = useSelector(
    (state: RootState) => state.board.enemyMoves
  );
  const castling: CastleType = useSelector(
    (state: RootState) => state.board.castling
  );

  const handleTileClick = (clickedTile: TileType) => {
    if (!previousClickedTile) {
      if (pieceOnTile && pieceOnTile.pieceColor === currentTurn) {
        handlePieceOnTile(
          dispatch,
          clickedTile,
          chessboard,
          isInCheck,
          validCheckMoves,
          enemyMoves,
          currentTurn
        );
      }
      return;
    }

    if (
      pieceOnTile &&
      pieceOnTile.pieceColor === currentTurn &&
      clickedTile.tilePosition !== previousClickedTile.tilePosition
    ) {
      handlePieceOnTile(
        dispatch,
        clickedTile,
        chessboard,
        isInCheck,
        validCheckMoves,
        enemyMoves,
        currentTurn
      );
      return;
    }

    if (isMoveValid(validMoves, clickedTile.tilePosition)) {
      // Reset Check Moves

      const updatedChessboard: TileType[][] | [] = handleMovePiece(
        dispatch,
        previousClickedTile,
        clickedTile,
        chessboard,
        castling
      );
      resetTiles(dispatch, updatedChessboard);

      dispatch(setEnemyMoves([]));
      dispatch(setCurrentTurn());
      dispatch(setMoveCounter());

      return;
    }

    // Invalid Moves
    resetTiles(dispatch, chessboard);
  };

  return (
    <div
      onClick={() => handleTileClick(tile)}
      className={`tile flex items-center justify-center ${getTileBackgroundColor(
        tile
      )} ${
        currentTurn === pieceOnTile?.pieceColor
          ? "hover:bg-blue-200 hover:cursor-pointer transition duration-400"
          : ""
      }`}
      style={{
        aspectRatio: "1",
      }}
    >
      {pieceOnTile && <Piece tile={tile} />}
    </div>
  );
};

export default Tile;
