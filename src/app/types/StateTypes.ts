import {
  ChessColors,
  ErrorType,
  MoveHistoryType,
  PlayerType,
  TileType,
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
  isRedoAvailable: boolean;
  isRedoVisible: boolean;
  // timeSettings: TimeType;
  error: ErrorType;
}

// Tracks chessboard and move history
export interface ChessboardHistoryStateType {
  isMovesHidden: boolean;
  currentMove: number;
  chessboardHistory: TileType[][][];
  movesHistory: MoveHistoryType[];
  isKingInCheck: boolean;
}

// Tracks all game potential moves including enemy moves
export interface MoveAnalysisStateType {
  currentPieceMoves: number[][];
  allEnemyMoves: number[][];
  piecesAttackingKing: EnemyAttackType[];
  validMovesWhenInCheck: number[][];
  invalidMovesWhenInCheck: number[][];
}

// Checks player setup is valid
export interface GameSetupStateType {
  isPlayerNameValid: boolean;
  isContinueVisible: boolean;
  isStartVisible: boolean;
}

// Tracks current and previous page for navigation
export interface PageStateType {
  currentPage: string;
  prevPage: string;
}
