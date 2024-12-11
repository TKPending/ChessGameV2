import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ChessPiece from "./ChessPiece";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { movePiece } from "@/app/utils/movePiece";
import { isMoveValid } from "@/app/utils/isMoveValid";
import { highlightClickedTile } from "@/app/utils/highlightClickedTile";
import { getTileBackgroundColor } from "@/app/utils/getTileBackgroundColor";
import { resetTiles } from "@/app/utils/resetTiles";

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
  const validMoves: [number, number][] = useSelector(
    (state: RootState) => state.board.piecePotentialMoves
  );
  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;

  const handleTileClick = (clickedTile: TileType) => {
    // First tile click
    if (!previousClickedTile) {
      if (pieceOnTile && pieceOnTile.pieceColor === currentTurn) {
        highlightClickedTile(dispatch, clickedTile, chessboard);
      }
      return;
    }

    // Clicking on a tile with the same team
    if (
      pieceOnTile &&
      pieceOnTile.pieceColor === currentTurn &&
      clickedTile.tilePosition !== previousClickedTile.tilePosition
    ) {
      highlightClickedTile(dispatch, clickedTile, chessboard);
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
