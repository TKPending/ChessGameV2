import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { getTileBackgroundColor } from "@/app/utils/chessboard/design/getTileBackgroundColor";
import Piece from "@/app/components/chessboardComponents/Piece";
import { TileType } from "@/app/types/TileType";

type TileProps = {
  tile: TileType;
  handleTileClick: (clickedTile: TileType) => void;
};

const Tile = ({ tile, handleTileClick }: TileProps) => {
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const isInCheckmate: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheckmate
  );

  const pieceOnTile = tile.pieceOnTile || null;
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
