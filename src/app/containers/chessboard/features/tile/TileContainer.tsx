import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/features/tile/components/Tile";

import {
  selectCurrentTeamMoves,
  selectSelectedPieceMoves,
} from "@/app/utils/selectors/moveAnalysisStateSelector";
import {
  selectCastling,
  selectChessboard,
  selectPrevClickedTile,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  setPreviousTile,
  updateTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import {
  selectCurrentTurn,
  selectIsPlaying,
} from "@/app/utils/selectors/gameStateSelectors";
import { setSelectedPieceMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";

import { resetTiles } from "@/app/containers/chessboard/utils/chessboard/design/resetTiles";
import { getPieceMoves } from "@/app/containers/chessboard/utils/pieceMovements/helpers/getPieceMoves";
import { findEnemyTiles } from "@/app/containers/chessboard/utils/helpers/findEnemyTiles";
import { handleMovePiece } from "@/app/containers/chessboard/utils/handlers/handleMovePiece";
import {
  incrementPlayerTime,
  setCurrentTurn,
  setRedoVisibility,
} from "@/app/redux/slices/gameState/gameStateSlice";
import { incrementMoveCounter } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { isMoveValid } from "@/app/containers/chessboard/utils/pieceMovements/helpers/isMoveValid";
import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";
import {
  setUiAttackTiles,
  setUiHighlightedTiles,
  setUiSelectedTile,
} from "@/app/redux/slices/uiChessboard/uiChessboardSlice";
import { resetUiHighlights } from "@/app/containers/chessboard/utils/chessboard/design/resetUiHighlights";
import { convertTilePosition } from "@/app/utils/convertTilePosition";

import { EnemyAttackType } from "@/app/types/MoveTypes";
import { ChessColors, PieceType, TileType } from "@/app/types/ChessTypes";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const chessboard = useSelector(selectChessboard);
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const prevClickedTile: TileType | null = useSelector(selectPrevClickedTile);
  const potentialMoves: EnemyAttackType[] = useSelector(selectCurrentTeamMoves);
  const selectedPieceMoves: number[][] = useSelector(selectSelectedPieceMoves);
  const moveCount: number = useSelector(selectCurrentMoveCount);
  const castling = useSelector(selectCastling);

  const handleTileClick = (clickedTile: TileType) => {
    dispatch(setRedoVisibility(false));

    // Viewing Mode
    if (!isPlaying) {
      return;
    }

    // Nothing Clicked
    if (!prevClickedTile && !clickedTile.pieceOnTile) {
      return;
    }

    const pieceOnClickedTile: PieceType | null = clickedTile.pieceOnTile;
    const clickedWrongColorFirst: boolean | null =
      pieceOnClickedTile &&
      pieceOnClickedTile.pieceColor !== currentTurn &&
      !prevClickedTile;

    // Clicked the wrong team first
    if (clickedWrongColorFirst) {
      resetUiHighlights(dispatch);
      return;
    }

    // Reset Tiles if empty click
    if (prevClickedTile && selectedPieceMoves) {
      const [clickedRow, clickedCol] = convertTilePosition(
        clickedTile.tilePosition
      );

      const isValidMove = selectedPieceMoves.some(
        ([row, col]) => row === clickedRow && col === clickedCol
      );

      if (!isValidMove) {
        resetUiHighlights(dispatch);
      }
    }

    // Valid Click
    const clickedSameTeam: boolean =
      pieceOnClickedTile?.pieceColor === currentTurn;
    if (!prevClickedTile || clickedSameTeam) {
      resetUiHighlights(dispatch);
      dispatch(setPreviousTile(clickedTile));

      // Highlight selected tile
      dispatch(updateTile(clickedTile));
      dispatch(setUiSelectedTile(clickedTile));

      // Filter out all legal moves for the current piece out of all team moves
      const legalMoves: number[][] | null = getPieceMoves(
        clickedTile,
        potentialMoves
      );

      // If there are legal moves highlight tiles
      if (legalMoves) {
        dispatch(setUiHighlightedTiles(legalMoves));
        dispatch(setSelectedPieceMoves(legalMoves));
        dispatch(
          setUiAttackTiles(findEnemyTiles(chessboard, legalMoves, currentTurn))
        );
      }

      return;
    }

    // Check move is valid and move the piece
    if (
      isMoveValid(selectedPieceMoves, clickedTile.tilePosition) &&
      prevClickedTile
    ) {
      handleMovePiece(
        dispatch,
        prevClickedTile,
        clickedTile,
        chessboard,
        moveCount,
        castling
      );

      // Reset the UI
      resetTiles(dispatch);

      // Reset Game States
      dispatch(setRedoVisibility(true));
      dispatch(incrementPlayerTime());
      dispatch(incrementMoveCounter());
      dispatch(setCurrentTurn());
    }
  };

  return <Tile tile={tile} handleTileClick={handleTileClick} />;
};

export default TileContainer;
