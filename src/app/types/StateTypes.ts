import {
  ChessColors,
  ErrorType,
  MoveHistoryType,
  PlayerType,
  TileType,
  TimeType,
} from "./ChessTypes";
import { CastleType, EnemyAttackType, PawnPromotionType } from "./MoveTypes";

// Redux State Types

// Tracks the state of the chessboard
export interface ChessboardStateType {
  chessboard: TileType[][];
  clickedTile: TileType | null;
  prevClickedTile: TileType | null;
  castling: CastleType;
  pawnPromotion: PawnPromotionType;
}

// Tracks overall game state
export interface GameStateType {
  players: PlayerType[];
  isPlaying: boolean;
  currentTurn: ChessColors.white | ChessColors.black;
  isGameReset: boolean;
  isKingInCheckmate: boolean;
  winner: PlayerType | null;
  stalemate: boolean;
  isRedoAvailable: boolean;
  isRedoVisible: boolean;
  timeSettings: TimeType;
  isViewMode: boolean;
  error: ErrorType;
}

// Tracks chessboard and move history
export interface ChessboardHistoryStateType {
  currentMoveCount: number;
  chessboardHistory: TileType[][][];
  movesHistory: MoveHistoryType[];
  previousGameState: GameStateType | null;
  isMovesHidden: boolean;
}

// Tracks all game potential moves including enemy moves
export interface MoveAnalysisStateType {
  isKingInCheck: boolean;
  currentTeamMoves: EnemyAttackType[];
  enemyTeamMoves: EnemyAttackType[];
  selectedPieceMoves: number[][];
}

// Checks player setup is valid
export interface GameSetupStateType {
  isPlayerNameValid: boolean;
}

// Tracks current and previous page for navigation
export interface PageStateType {
  currentPage: string;
  prevPage: string;
}
