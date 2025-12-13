import { TileType, PieceType } from "./ChessTypes";

export interface EnemyAttackType {
  piecePosition: [number, number];
  piece: PieceType;
  moves: number[][];
  direction: any;
}

export interface PawnPromotionType {
  isPawnPromotion: boolean;
  tileToUpdate: TileType | null;
}

// export interface CastleType {
//   whiteKing: {
//     kingPosition: [number, number];
//     kingMoved: boolean;
//   };
//   blackKing: {
//     kingPosition: [number, number];
//     kingMoved: boolean;
//   };
//   black: {
//     canCastleOption: boolean;
//     rightCastleOption: boolean;
//     leftCastleOption: boolean;
//   };
//   white: {
//     canCastleOption: boolean;
//     rightCastleOption: boolean;
//     leftCastleOption: boolean;
//   };
// }

export interface CastleType {
  canCastle: boolean;
  queenSideCastling: boolean;
  kingSideCastling: boolean;
}
