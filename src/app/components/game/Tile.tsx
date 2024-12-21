import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setMoveCounter } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import {
  setCurrentTurn,
  setEnemyMoves,
} from "@/app/redux/slices/board/boardSlice";
import ChessPiece from "./ChessPiece";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { movePiece } from "@/app/utils/movePiece";
import { isMoveValid } from "@/app/utils/isMoveValid";
import { handleClickedPiece } from "@/app/utils/handleClickedPiece";
import { getTileBackgroundColor } from "@/app/utils/getTileBackgroundColor";
import { resetTiles } from "@/app/utils/resetTiles";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { CastleType } from "@/app/types/CastleType";

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
  const isInCheckmate: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheckmate
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheck
  );
  const validMoves: [number, number][] = useSelector(
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
        handleClickedPiece(
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
      handleClickedPiece(
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

      const updatedChessboard: TileType[][] | [] = movePiece(
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
      {pieceOnTile && <ChessPiece tile={tile} />}
    </div>
  );
};

export default Tile;
