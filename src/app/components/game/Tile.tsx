import { useSelector, useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { RootState } from "@/app/redux/store";
import ChessPiece from "./ChessPiece";
import { tileClickedProcess } from "@/app/utils/PieceMovement/tileClickedProcess";

type Props = {
  tile: TileType;
};

const Tile = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const currentBoardState: TileType[][] = useSelector(
    (state: RootState) => state.board.currentBoardState
  );
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
    if (tile.isHighlighted) return "bg-green-200"; // Highlight color
    return tile.defaultTileColor === "White" ? "bg-white" : "bg-gray-800";
  };

  const handleTileClick = (clickedTile: TileType) => {
    tileClickedProcess(
      dispatch,
      currentBoardState,
      currentTile,
      clickedTile,
      previousTile,
      currentTurn
    );
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
