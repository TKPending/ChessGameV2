import { TileType } from "./TileType";
import { PlayerType } from "./PlayerType";

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
  enemyMoves: number[][];
}
