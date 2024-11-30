import { useSelector, useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import { RootState } from "@/app/redux/store";
import { setCurrentTile, setPreviousTile } from "@/app/redux/slices/tile/tileSlice";
import { setTile } from "@/app/redux/slices/board/boardSlice";
import ChessPiece from "./ChessPiece";
import { movePiece } from "@/app/utils/movePiece";
import { isValidMove } from "@/app/utils/validateMove";
import { getPotentialMoves } from "@/app/utils/potentialMoves";

type Props = {
  tile: TileType;
};

const Tile = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const currentBoardState: TileType[][] = useSelector((state: RootState) => state.board.currentBoardState);
  const currentTurn: "White" | "Black" = useSelector((state: RootState) => state.board.currentTurn);
  const currentTile: TileType | null = useSelector((state: RootState) => state.tile.currentTile);
  const piece: PieceType | null = tile.pieceOnTile || null;

  const getTileBackgroundColor = (): string => {
    if (tile.isHighlighted) return "bg-green-200"; // Highlight color
    return tile.defaultTileColor === "White" ? "bg-white" : "bg-gray-800";
  };
  

  const handleTileClick = (clickedTile: TileType) => {
    if (clickedTile === currentTile) {
      // Clear highlights when clicking the same tile
      clearHighlights();
      dispatch(setCurrentTile(null));
      dispatch(setPreviousTile(null));
      return;
    }
  
    if (!currentTile) {
      // First click: Select a piece and highlight its moves
      if (clickedTile.pieceOnTile?.pieceColor === currentTurn) {
        const piece = clickedTile.pieceOnTile;
        if (piece) {
          const potentialMoves = getPotentialMoves(piece, clickedTile, currentBoardState);
  
          potentialMoves.forEach(moveTile => {
            dispatch(setTile({ tile: { ...moveTile, isHighlighted: true } }));
          });
  
          dispatch(setTile({ tile: { ...clickedTile, isHighlighted: true } }));
          dispatch(setCurrentTile(clickedTile))
        }
      }
      return;
    }
  
    // If selecting another piece of the same color
    if (clickedTile.pieceOnTile?.pieceColor === currentTurn) {
      clearHighlights();
      const piece = clickedTile.pieceOnTile;
      if (piece) {
        const potentialMoves = getPotentialMoves(piece, clickedTile, currentBoardState);
  
        potentialMoves.forEach(moveTile => {
          dispatch(setTile({ tile: { ...moveTile, isHighlighted: true } }));
        });
  
        dispatch(setTile({ tile: { ...clickedTile, isHighlighted: true } }));
        dispatch(setCurrentTile(clickedTile));
      }
      return;
    }
  
    // Handle move if clicking on a valid highlighted tile
    if (clickedTile.isHighlighted && currentTile?.pieceOnTile) {
      movePiece(dispatch, currentTile, clickedTile, currentBoardState);
      // dispatch(setCurrentTile(null));
      // dispatch(setPreviousTile(null));
      // clearHighlights();
    } else {
      console.log("Invalid move");
    }
  };
  
  // Helper to clear highlights
  const clearHighlights = () => {
    currentBoardState.forEach(row => {
      row.forEach(tile => {
        if (tile.isHighlighted) {
          dispatch(setTile({ tile: { ...tile, isHighlighted: false } }));
        }
      });
    });
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
