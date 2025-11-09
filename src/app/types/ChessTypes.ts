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

export enum TimeCatergories {
  blitz = "Blitz",
  rapid = "Rapid",
  infinite = "Infinite",
}

export interface PieceType {
  pieceName: PieceName;
  pieceColor: ChessColors.white | ChessColors.black;
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

export interface TimeType {
  timeCategory:
    | TimeCatergories.blitz
    | TimeCatergories.rapid
    | TimeCatergories.infinite;
  minutes: number;
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

export interface MoveHistoryType {
  from: TileType;
  to: TileType;
  pawnPromotion?: boolean;
  updatedPiece?: PieceName;
}
