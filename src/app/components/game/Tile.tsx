import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setMoveCounter } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import { setCurrentTurn } from "@/app/redux/slices/board/boardSlice";
import ChessPiece from "./ChessPiece";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { movePiece } from "@/app/utils/movePiece";
import { isMoveValid } from "@/app/utils/isMoveValid";
import { handleClickedPiece } from "@/app/utils/handleClickedPiece";
import { getTileBackgroundColor } from "@/app/utils/getTileBackgroundColor";
import { resetTiles } from "@/app/utils/resetTiles";
import { generateEnemyMoves } from "@/app/utils/moveLogic/generateEnemyMoves";
import { isKingInCheckmate } from "@/app/utils/moveLogic/king/isKingInCheckmate";
import { useEffect } from "react";

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
  const validMoves: [number, number][] = useSelector(
    (state: RootState) => state.board.piecePotentialMoves
  );
  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;

  const handleTileClick = (clickedTile: TileType) => {
    // First tile click
    if (!previousClickedTile) {
      if (pieceOnTile && pieceOnTile.pieceColor === currentTurn) {
        handleClickedPiece(dispatch, clickedTile, chessboard);
      }
      return;
    }

    // Clicking on a tile with the same team
    if (
      pieceOnTile &&
      pieceOnTile.pieceColor === currentTurn &&
      clickedTile.tilePosition !== previousClickedTile.tilePosition
    ) {
      handleClickedPiece(dispatch, clickedTile, chessboard);
      return;
    }

    // Move Piece
    if (isMoveValid(validMoves, clickedTile.tilePosition)) {
      const updatedChessboard: TileType[][] | [] = movePiece(
        dispatch,
        previousClickedTile,
        clickedTile,
        chessboard
      );
      resetTiles(dispatch, updatedChessboard);

      const updatedAllPieceMoves: any = generateEnemyMoves(
        dispatch,
        updatedChessboard,
        currentTurn
      );

      isKingInCheckmate(
        dispatch,
        updatedChessboard,
        updatedAllPieceMoves,
        currentTurn
      );

      dispatch(setCurrentTurn());
      dispatch(setMoveCounter());

      return;
    }

    // Invalid Moves
    resetTiles(dispatch, chessboard);
  };

  useEffect(() => {
    if (isInCheckmate) {
      console.log("In checkmate");
    }
  }, [isInCheckmate]);

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
