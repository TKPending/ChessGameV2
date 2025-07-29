import { EnemyAttackType, PawnPromotionType, CastleType } from "./MoveTypes";

export enum ChessColors {
  white = "White",
  black = "Black",
}

export enum PieceName {
  pawn = "Pawn",
  rook = "Rook",
  knight = "Knight",
  bishop = "Bishop",
  queen = "Queen",
  king = "King",
}

export interface PieceType {
  pieceName: PieceName;
  pieceColor: "White" | "Black";
  isAlive: boolean;
  hasMoved: boolean;
  isPromotion?: boolean;
  king?: {
    hasMoved: false;
    inCheck: false;
    canCastle: true;
    checkmate: false;
  };
}

export interface BoardType {
  board: TileType[][];
  currentTurn: "White" | "Black";
  clickedTile: TileType | null;
  previouslyClickedTile: TileType | null;
  isKingInCheck: boolean;
  isKingInCheckmate: boolean;
  castling: CastleType;
  pawnPromotion: PawnPromotionType;
}

export interface TileType {
  tilePosition: string;
  defaultTileColor: ChessColors;
  currentTileColor: string;
  pieceOnTile: PieceType | null;
  isHighlighted: boolean;
  highlightReason: "enemy" | "friendly" | "selected" | "";
}

export interface ErrorType {
  isError: boolean;
  message: string;
}

export interface PlayerType {
  no: number;
  playerName: string;
  team: ChessColors;
  capturedPieces: PieceType[];
  remainingTime: string;
  isInCheck?: boolean;
  isInCheckmate?: boolean;
}

export interface GameStateType {
  stateIndex: number;
  players: PlayerType[];
  winner: PlayerType | undefined;
  isPlaying: boolean;
  error: ErrorType;
}

export interface MoveHistoryType {
  from: TileType;
  to: TileType;
  pawnPromotion?: boolean;
  updatedPiece?: PieceName;
}

export interface ChessMoveType {
  count: number;
  chessboardHistory: TileType[][][];
  moveHistory: MoveHistoryType[];
  isMovesHidden: boolean;
}

export interface ActiveMovesType {
  currentPiecePotentialMoves: number[][];
  enemyMoves: EnemyAttackType[];
  pieceAttackingKing: EnemyAttackType[];
  validCheckMoves: number[][];
  inCheckPositions: number[][];
}

export interface PlayerSetupType {
  validPlayerNames: boolean;
  validTimes: boolean;
  isStartVisible: boolean;
}
