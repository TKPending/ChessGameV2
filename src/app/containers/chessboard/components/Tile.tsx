import { useSelector } from "react-redux";
import Piece from "@/app/containers/chessboard/components/Piece";

import {
  selectCurrentTurn,
  selectIsKingInCheckmate,
  selectIsPlaying,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  selectUiAttackTiles,
  selectUiHighlightedTiles,
  selectUiPreviousMoveTile,
  selectUiSelectedTile,
} from "@/app/utils/selectors/uiChessboardSelector";

import { getTileBackgroundColor } from "@/app/utils/chessboard/getTileBackgroundColor";

import {
  ChessColors,
  TileType,
  uiPreviousMoveType,
} from "@/app/types/ChessTypes";

type TileProps = {
  tile: TileType;
  handleClick: (clickedTile: TileType) => void;
};

/**
 * Renders each individual tile with their own data
 * @param tile Tile Data
 * @param handleClick Function to handle when a user clicks on a tile
 * @returns A Tile
 */
const Tile = ({ tile, handleClick }: TileProps) => {
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const isKingInCheckmate: boolean = useSelector(selectIsKingInCheckmate);
  const uiSelectedTile: TileType | null = useSelector(selectUiSelectedTile);
  const uiAttackedTiles: string[] = useSelector(selectUiAttackTiles);
  const uiPreviousMoveTile: uiPreviousMoveType = useSelector(
    selectUiPreviousMoveTile
  );
  const uiHighlightedTiles: string[] = useSelector(selectUiHighlightedTiles);
  const pieceOnTile = tile.pieceOnTile || null;
  const tilePosition = tile.tilePosition; // e.g., "a1"
  const colLetter = tilePosition[0]; // "a"
  const rowNumber = tilePosition[1]; // "1"

  // Determine if this tile is in the leftmost column or bottommost row
  const isLeftColumn = colLetter === "a"; // Leftmost column
  const isBottomRow = rowNumber === "1"; // Bottommost row

  const tileBackgroundColor: string = getTileBackgroundColor(
    tile,
    uiSelectedTile,
    uiHighlightedTiles,
    uiAttackedTiles,
    uiPreviousMoveTile
  );

  return (
    <div
      onClick={() => handleClick(tile)}
      className={`relative tile tileBorder transition duration-200  ${tileBackgroundColor} ${
        isPlaying &&
        currentTurn === pieceOnTile?.pieceColor &&
        !isKingInCheckmate
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
