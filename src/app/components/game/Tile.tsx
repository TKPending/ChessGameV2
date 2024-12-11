import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setClickedTile,
  setPreviouslyClickedTile,
  setSpecificTile,
  setValidMoves,
} from "@/app/redux/slices/board/boardSlice";
import ChessPiece from "./ChessPiece";
import { clearHighlights } from "@/app/utils/PieceMovement/clearHighlight";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { movePiece } from "@/app/utils/PieceMovement/click/movePiece";
import { generatePieceMovements } from "@/app/utils/PieceMovement/generatePieceMovements";
import { isMoveValid } from "@/app/utils/PieceMovement/isMoveValid";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

type Props = {
  tile: TileType;
};

const highlightClickedTile = (
  dispatch: Dispatch<UnknownAction>,
  clickedTile: TileType,
  chessboard: TileType[][]
) => {
  clearHighlights(dispatch, chessboard);
  dispatch(setPreviouslyClickedTile(clickedTile));
  dispatch(
    setSpecificTile({
      ...clickedTile,
      isHighlighted: true,
      highlightReason: "selected",
    })
  );
  const pieceValidMoves: [number, number][] = generatePieceMovements(
    dispatch,
    chessboard,
    clickedTile
  );
  dispatch(setValidMoves(pieceValidMoves));
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
  const validMoves: [number, number][] = useSelector(
    (state: RootState) => state.board.piecePotentialMoves
  );
  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;

  const resetTiles = (updatedChessboard: TileType[][]) => {
    dispatch(setClickedTile(null));
    dispatch(setPreviouslyClickedTile(null));
    dispatch(setValidMoves([]));
    clearHighlights(dispatch, updatedChessboard);
  };

  const getTileBackgroundColor = (): string => {
    if (tile.isHighlighted) {
      return tile.highlightReason === "enemy"
        ? "bg-red-200"
        : tile.highlightReason === "selected"
        ? "bg-blue-200"
        : "bg-green-200";
    }
    return tile.defaultTileColor === "White" ? "bg-white" : "bg-gray-800";
  };

  const handleTileClick = (clickedTile: TileType) => {
    // If no previous tile is selected
    if (!previousClickedTile) {
      if (pieceOnTile && pieceOnTile.pieceColor === currentTurn) {
        highlightClickedTile(dispatch, clickedTile, chessboard);
      }
      return;
    }

    // If the same team piece is clicked after a piece is already selected
    if (
      pieceOnTile &&
      pieceOnTile.pieceColor === currentTurn &&
      clickedTile.tilePosition !== previousClickedTile.tilePosition
    ) {
      highlightClickedTile(dispatch, clickedTile, chessboard);
      return;
    }

    // If a valid move is selected
    if (isMoveValid(validMoves, clickedTile.tilePosition)) {
      const updatedChessboard: TileType[][] | [] = movePiece(
        dispatch,
        previousClickedTile,
        clickedTile,
        chessboard
      );
      resetTiles(updatedChessboard); // Clear state after move
      return;
    }

    // Reset on invalid move
    resetTiles(chessboard);
  };

  return (
    <div
      onClick={() => handleTileClick(tile)}
      className={`flex items-center justify-center ${getTileBackgroundColor()} ${
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
