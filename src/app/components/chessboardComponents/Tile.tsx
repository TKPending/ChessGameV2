import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setMoveCounter } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import {
  setCurrentTurn,
  setEnemyMoves,
  setPiecesAttackingKing,
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
  const piecesAttackingKing = useSelector(
    (state: RootState) => state.board.pieceAttackingKing
  );
  const isInCheckmate: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheckmate
  );

  const handleTileClick = (clickedTile: TileType) => {
    if (!previousClickedTile) {
      if (pieceOnTile && pieceOnTile.pieceColor === currentTurn) {
        handlePieceOnTile(
          dispatch,
          clickedTile,
          chessboard,
          isInCheck,
          piecesAttackingKing,
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
        piecesAttackingKing,
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
      dispatch(setPiecesAttackingKing(null));

      return;
    }

    // Invalid Moves
    resetTiles(dispatch, chessboard);
  };

  const tilePosition = tile.tilePosition; // e.g., "a1"
  const colLetter = tilePosition[0]; // "a"
  const rowNumber = tilePosition[1]; // "1"

  // Determine if this tile is in the leftmost column or bottommost row
  const isLeftColumn = colLetter === "a"; // Leftmost column
  const isBottomRow = rowNumber === "1"; // Bottommost row

  return (
    <div
      onClick={() => handleTileClick(tile)}
      className={`relative tile tileBorder  ${getTileBackgroundColor(tile)} ${
        currentTurn === pieceOnTile?.pieceColor && !isInCheckmate
          ? "hover:bg-blue-200 hover:cursor-pointer transition duration-400"
          : ""
      }`}
      style={{
        aspectRatio: "1",
      }}
    >
      {pieceOnTile && <Piece tile={tile} />}

      {isLeftColumn && (
        <div className="hidden md:flex absolute top-2 left-2 font-semibold">
          {rowNumber}
        </div>
      )}
      {isBottomRow && (
        <div className="hidden md:flex absolute bottom-2 right-2 font-semibold">
          {colLetter}
        </div>
      )}
    </div>
  );
};

export default Tile;
