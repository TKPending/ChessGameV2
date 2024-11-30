import { TileType } from "./TileType";
import { PlayerType } from "./PlayerType";
import { MoveType } from "./MoveType";

export interface BoardType {
  tiles: TileType[][]; // 2D array for easier access
  currentState: TileType[][]; // Current state of the board
  previousStates: TileType[][][]; // History of board states
  stateIndex: number;
  players: PlayerType[];
  winner: PlayerType | undefined;
  isPlaying: boolean;
  currentTurn: "White" | "Black";
  moveHistory: MoveType[];
}
