import { resetUiHighlights } from "@/app/utils/chessboard/resetUiHighlights";
import {
  setPreviousTile,
  updateTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import {
  incrementPlayerTime,
  setCurrentTurn,
  setRedoVisibility,
} from "@/app/redux/slices/gameState/gameStateSlice";
import { movePlayed } from "@/app/redux/slices/history/historySlice";
import {
  setUiAttackTiles,
  setUiHighlightedTiles,
  setUiPreviousMoveTile,
  setUiSelectedTile,
} from "@/app/redux/slices/uiChessboard/uiChessboardSlice";
import { setSelectedPieceMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";

import { resetTiles } from "@/app/utils/chessboard/resetTiles";
import { getPieceMoves } from "@/app/utils/getPieceMoves";
import { findEnemyTiles } from "@/app/utils/tileChecks/findEnemyTiles";
import { movePiece } from "@/app/utils/pieceMovements/movePiece";
import { isMoveValid } from "@/app/utils/moveChecks/isMoveValid";
import { convertTilePosition } from "@/app/utils/convertTilePosition";

import { ChessColors, TileType } from "@/app/types/ChessTypes";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { CastleType, EnemyAttackType } from "@/app/types/MoveTypes";

/**
 * Determines whether the clicked tile contains a piece belonging to the current player.
 * @param {TileType} tile - The tile that was clicked.
 * @param {ChessColors} turn - The color of the current player's turn.
 * @returns {boolean} Whether the tile contains a same-team piece.
 */
export const isSameTeamPiece = (tile: TileType, turn: ChessColors) =>
  tile.pieceOnTile?.pieceColor === turn;

/**
 * Determines whether the user clicked an opposing team's piece before selecting one of their own.
 * Used to prevent selecting enemy pieces as the first click.
 * @param {TileType} clickedTile - The tile that was clicked.
 * @param {TileType | null} prevClickedTile - The previously clicked tile, if any.
 * @param {ChessColors} turn - The current player's turn color.
 * @returns {boolean} Whether the first click was on the wrong team.
 */
export const isWrongOpeningClick = (
  clickedTile: TileType,
  prevClickedTile: TileType | null,
  turn: ChessColors
) =>
  clickedTile.pieceOnTile &&
  clickedTile.pieceOnTile.pieceColor !== turn &&
  !prevClickedTile;

/**
 * Determines whether a click should be ignored entirely.
 * A click is ignored if nothing is currently selected and the clicked tile is empty.
 * @param {TileType} clickedTile - The tile that was clicked.
 * @param {TileType | null} prevClickedTile - The previously selected tile, if any.
 * @returns {boolean} Whether the click is irrelevant to the game state.
 */
export const shouldIgnoreClick = (
  clickedTile: TileType,
  prevClickedTile: TileType | null
) => !prevClickedTile && !clickedTile.pieceOnTile;

/**
 * Checks if the clicked tile matches one of the currently selected piece's legal moves.
 * @param {TileType} clickedTile - The tile that was clicked.
 * @param {number[][]} selectedMoves - The list of legal move coordinates for the selected piece.
 * @returns {boolean} Whether the tile lies within the selected piece's valid moves.
 */
export const isValidMoveSelection = (
  clickedTile: TileType,
  selectedMoves: number[][]
) => {
  if (!selectedMoves) return false;
  const [r, c] = convertTilePosition(clickedTile.tilePosition);
  return selectedMoves.some(([row, col]) => row === r && col === c);
};

/**
 * Determines whether the click is intended to select a piece rather than execute a move.
 * Occurs when no tile is previously selected or when clicking a same-team piece.
 * @param {TileType | null} prevTile - The previously selected tile, if any.
 * @param {boolean} sameTeamClick - Whether the clicked tile contains a same-team piece.
 * @returns {boolean} Whether the click should be treated as a piece selection action.
 */
export const isPieceSelection = (
  prevTile: TileType | null,
  sameTeamClick: boolean
) => !prevTile || sameTeamClick;

/**
 * Determines whether the click triggers a piece movement.
 * Movement occurs when a previous tile exists and the clicked tile is a valid destination.
 * @param {TileType | null} prevTile - The previously selected tile.
 * @param {TileType} clickedTile - The tile that was clicked.
 * @param {number[][]} selectedMoves - The legal moves of the selected piece.
 * @returns {boolean} Whether the click represents a valid move execution.
 */
export const canExecuteMove = (
  prevTile: TileType | null,
  clickedTile: TileType,
  selectedMoves: number[][]
) => prevTile && isMoveValid(selectedMoves, clickedTile.tilePosition);

/**
 * Handles selecting a piece on the board, updating UI highlights and listing legal moves.
 * @param {Dispatch<UnknownAction>} dispatch - Redux dispatch function.
 * @param {TileType[][]} chessboard - The current chessboard state.
 * @param {ChessColors} currentTurn - The current player's turn.
 * @param {TileType} tile - The tile that was clicked.
 * @param {EnemyAttackType[]} potentialMoves - All enemy-attack-annotated legal moves for the current team.
 */
export const handlePieceSelection = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  currentTurn: ChessColors,
  tile: TileType,
  potentialMoves: EnemyAttackType[]
) => {
  resetUiHighlights(dispatch);
  dispatch(setPreviousTile(tile));
  dispatch(updateTile(tile));
  dispatch(setUiSelectedTile(tile));

  const legalMoves = getPieceMoves(tile, potentialMoves);

  if (legalMoves) {
    dispatch(setUiHighlightedTiles(legalMoves));
    dispatch(setSelectedPieceMoves(legalMoves));
    dispatch(
      setUiAttackTiles(findEnemyTiles(chessboard, legalMoves, currentTurn))
    );
  }
};

/**
 * Executes a piece movement, updates the board state, and applies turn-based effects.
 * Handles castling, capturing, movement history, and UI post-move highlights.
 * @param {Dispatch<UnknownAction>} dispatch - Redux dispatch function.
 * @param {TileType[][]} chessboard - The current chessboard state.
 * @param {TileType | null} fromTile - The tile the piece is moving from.
 * @param {TileType} toTile - The tile the piece is moving to.
 * @param {number} moveCount - The current move number.
 * @param {CastleType} castleState - The castling status object for the current turn.
 */
export const handlePieceMove = (
  dispatch: Dispatch<UnknownAction>,
  chessboard: TileType[][],
  fromTile: TileType | null,
  toTile: TileType,
  moveCount: number,
  castleState: CastleType
) => {
  if (!fromTile) return;
  movePiece(dispatch, fromTile, toTile, chessboard, moveCount, castleState);

  resetTiles(dispatch);

  dispatch(
    setUiPreviousMoveTile({
      from: fromTile.tilePosition,
      to: toTile.tilePosition,
    })
  );

  dispatch(setRedoVisibility(true));
  dispatch(incrementPlayerTime());
  dispatch(movePlayed());
  dispatch(setCurrentTurn());
};
