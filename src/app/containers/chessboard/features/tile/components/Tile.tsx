import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { getTileBackgroundColor } from "@/app/utils/chessboard/design/getTileBackgroundColor";
import Piece from "@/app/containers/chessboard/features/tile/components/Piece";
import { TileType } from "@/app/types/ChessTypes";

type TileProps = {
  tile: TileType;
  handleTileClick: (clickedTile: TileType) => void;
};

const Tile = ({ tile, handleTileClick }: TileProps) => {
  const { currentTurn, isKingInCheckmate } = useSelector(
    (state: RootState) => state.gameState
  );

  const pieceOnTile = tile.pieceOnTile || null;
  const tilePosition = tile.tilePosition; // e.g., "a1"
  const colLetter = tilePosition[0]; // "a"
  const rowNumber = tilePosition[1]; // "1"

  // Determine if this tile is in the leftmost column or bottommost row
  const isLeftColumn = colLetter === "a"; // Leftmost column
  const isBottomRow = rowNumber === "1"; // Bottommost row

  const tileBackgroundColor: string = getTileBackgroundColor(tile);

  return (
    <div
      onClick={() => handleTileClick(tile)}
      className={`relative tile tileBorder transition duration-200  ${tileBackgroundColor} ${
        currentTurn === pieceOnTile?.pieceColor && !isKingInCheckmate
          ? "hover:bg-blue-200 hover:cursor-pointer"
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
