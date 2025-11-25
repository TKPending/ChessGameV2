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

export const timeSettingsOptions: TimeSettingsOptionsType[] = [
  {
    name: "Blitz",
    durations: ["1 Minutes", "3 Minutes", "5 Minutes"],
    increments: ["0 Seconds", "5 Seconds", "10 Seconds"],
  },
  {
    name: "Rapid",
    durations: ["5 Minutes", "10 Minutes"],
    increments: ["0 Seconds", "10 Seconds", "15 Seconds"],
  },
  {
    name: "Classical",
    durations: ["10 Minutes", "Infinite"],
    increments: ["0 Seconds", "15 Seconds", "Infinite"],
  },
];

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
  increment: string;
}

export interface TimeSettingsOptionsType {
  name: string;
  durations: string[];
  increments: string[];
}

export interface PlayerType {
  no: number;
  playerName: string;
  team: ChessColors;
  capturedPieces: PieceType[];
  remainingTime: number;
  isInCheck?: boolean;
  isInCheckmate?: boolean;
}

export interface MoveHistoryType {
  from: TileType;
  to: TileType;
  pawnPromotion?: boolean;
  updatedPiece?: PieceName;
}
