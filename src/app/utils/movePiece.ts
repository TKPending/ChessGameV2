import { setBoardHistory, setCapturedPiece, setChessboard, setCurrentTurn, setMoveHistory } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";
import { PieceType } from "../types/PieceType";

export const movePiece = (
    dispatch: any,
    currentTile: TileType,
    targetTile: TileType,
    currentBoardState: TileType[][],
  ) => {
    if (!currentTile.pieceOnTile) return;
    if (targetTile.pieceOnTile) {
        const capturedPiece: PieceType = {
            ...targetTile.pieceOnTile,
            isAlive: false,
        };

        dispatch(setCapturedPiece(capturedPiece));
    }
  
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

    // Update Move History
    dispatch(setMoveHistory({
       from: currentTile,
       to: targetTile,
    }))
  
    // Update the board and switch turns
    dispatch(setChessboard(newBoardState));
    dispatch(setCurrentTurn()); // Call after a successful move
  };
  