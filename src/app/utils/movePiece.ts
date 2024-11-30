import { setBoardHistory, setChessboard, setCurrentTurn } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";

export const movePiece = (
    dispatch: any,
    currentTile: TileType,
    targetTile: TileType,
    currentBoardState: TileType[][],
    currentTurn: string
  ) => {
    if (!currentTile.pieceOnTile) return; // Ensure there's a piece to move
  
    const updatedTargetTile = {
      ...targetTile,
      pieceOnTile: currentTile.pieceOnTile,
      isHighlighted: false,
    };
  
    const updatedCurrentTile = {
      ...currentTile,
      pieceOnTile: null,
      isHighlighted: false,
    };
  
    const newBoardState = currentBoardState.map((row) =>
      row.map((tile) =>
        tile.tilePosition === currentTile.tilePosition
          ? updatedCurrentTile
          : tile.tilePosition === targetTile.tilePosition
          ? updatedTargetTile
          : tile
      )
    );
  
    // Save the current state to history for undo functionality
    dispatch(setBoardHistory(currentBoardState));
  
    // Update the board and switch turns
    dispatch(setChessboard(newBoardState));
    dispatch(setCurrentTurn()); // Call after a successful move
  };
  