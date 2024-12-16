import { TileType } from "./TileType";
import { PlayerType } from "./PlayerType";
import { EnemyAttackType } from "./EnemyAttackType";

export interface BoardType {
  chessboard: TileType[][];
  stateIndex: number;
  players: PlayerType[];
  winner: PlayerType | undefined;
  isPlaying: boolean;
  currentTurn: "White" | "Black";
  clickedTile: TileType | null;
  previousClickedTile: TileType | null;
  piecePotentialMoves: [number, number][];
  enemyMoves: EnemyAttackType[];
  isKingInCheck: boolean;
  isKingInCheckmate: boolean;
  validCheckMoves: number[][];
  inCheckPositions: number[][];
}
