import { PieceType } from "./PieceType";

export interface EnemyAttackType {
  piecePosition: [number, number];
  piece: PieceType;
  moves: number[][];
  direction: any;
}
