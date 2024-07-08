import { TileType } from "./TileType";
import { PlayerType } from "./PlayerType";
import { MoveType } from "./MoveType";

export interface BoardType {
  tiles: TileType[][]; // 2D array for easier access
  currentState: TileType[][]; // Current state of the board
  previousStates: TileType[][][]; // History of board states
  players: PlayerType[];
  winner: PlayerType | undefined;
  isPlaying: boolean;
  currentTurn: string;
  moveHistory: MoveType[];
}
