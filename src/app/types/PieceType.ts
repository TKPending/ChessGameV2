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
