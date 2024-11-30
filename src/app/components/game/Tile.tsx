import { useSelector, useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { RootState } from "@/app/redux/store";
import { setCurrentTile, setPreviousTile } from "@/app/redux/slices/tile/tileSlice";
import { setTile } from "@/app/redux/slices/board/boardSlice";
import ChessPiece from "./ChessPiece";

type Props = {
  tile: TileType;
};

const Tile = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const currentTile: TileType | null = useSelector(
    (state: RootState) => state.tile.currentTile
  );
  const previousTile: TileType | null = useSelector(
    (state: RootState) => state.tile.previousTile
  );
  const piece: PieceType | null = tile.pieceOnTile || null;

  const getTileBackgroundColor = (): string => {
    if (tile.isHighlighted) return "bg-green-200";
    return tile.defaultTileColor === "White" ? "bg-white" : "bg-gray-800";
  };

  const handleTileClick = (clickedTile: TileType) => {
    if (clickedTile === currentTile) {
      // Deselect if clicking the same tile
      dispatch(setTile({ tile: { ...clickedTile, isHighlighted: false } }));
      dispatch(setCurrentTile(null));
      dispatch(setPreviousTile(null));
      return;
    }

    if (!currentTile) {
      // First click
      if (clickedTile.pieceOnTile?.pieceColor === currentTurn) {
        dispatch(setTile({ tile: { ...clickedTile, isHighlighted: true } }));
        dispatch(setCurrentTile(clickedTile));
      }
      return;
    }

    // Clicking another tile
    if (clickedTile.pieceOnTile?.pieceColor === currentTurn) {
      // Clicked on a friendly piece
      dispatch(setTile({ tile: { ...currentTile, isHighlighted: false } }));
      dispatch(setTile({ tile: { ...clickedTile, isHighlighted: true } }));
      dispatch(setPreviousTile(currentTile));
      dispatch(setCurrentTile(clickedTile));
    } else {
      // Clicked on an enemy or empty tile
      dispatch(setTile({ tile: { ...currentTile, isHighlighted: false } }));
      dispatch(setPreviousTile(currentTile));
      dispatch(setCurrentTile(clickedTile));
    }
  };

  return (
    <div
      onClick={() => handleTileClick(tile)}
      className={`flex items-center justify-center ${getTileBackgroundColor()} ${
        currentTurn === piece?.pieceColor
          ? "hover:bg-red-200 hover:cursor-pointer transition duration-400"
          : ""
      }`}
      style={{
        aspectRatio: "1",
      }}
    >
      {piece && <ChessPiece tile={tile} />}
    </div>
  );
};

export default Tile;
