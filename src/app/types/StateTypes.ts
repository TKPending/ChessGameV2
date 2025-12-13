import {
  ChessColors,
  ErrorType,
  MoveHistoryType,
  PlayerType,
  TileType,
  TimeType,
  uiPreviousMoveType,
} from "./ChessTypes";
import { CastleType, EnemyAttackType, PawnPromotionType } from "./MoveTypes";

// Redux State Types

// Tracks the state of the chessboard
export interface ChessboardStateType {
  chessboard: TileType[][];
  previousTile: TileType | null;
  // castling: CastleType;
  whiteCastling: CastleType;
  blackCastling: CastleType;
  pawnPromotion: PawnPromotionType;
}

// Tracks chessboard UI
export interface uiChessboardType {
  uiSelectedTile: TileType | null;
  uiHighlightedTiles: string[];
  uiAttackTiles: string[];
  uiPreviousMoveTile: uiPreviousMoveType;
}

// Tracks overall game state
export interface GameStateType {
  players: PlayerType[];
  isPlaying: boolean;
  currentTurn: ChessColors.white | ChessColors.black;
  isGameReset: boolean;
  isKingInCheckmate: boolean;
  winByTime: boolean;
  stalemate: boolean;
  winner: PlayerType | null;
  isRedoAvailable: boolean;
  isRedoVisible: boolean;
  timeSettings: TimeType;
  isViewMode: boolean;
  error: ErrorType;
}

// Tracks chessboard and move history
export interface HistoryStateType {
  count: number; // Total moves made
  chessboardHistory: TileType[][][]; // History of chessboard states
  movesHistory: MoveHistoryType[]; // History of moves made
  previousGameState: GameStateType | null; // Previous game state (Undo Feature)
}

// Tracks all game potential moves including enemy moves
export interface MoveAnalysisStateType {
  currentTeamMoves: EnemyAttackType[];
  selectedPieceMoves: number[][];
}

// Tracks current and previous page for navigation
export interface PageStateType {
  index: number;
  prevIndex: number | null;
}
