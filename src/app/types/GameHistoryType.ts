import { TileType } from "./TileType";

export interface MoveHistoryType {
  from: TileType;
  to: TileType;
}

export interface GameHistoryType {
  count: number;
  chessboardHistory: TileType[][][];
  moveHistory: MoveHistoryType[];
  isPreviousMovesHidden: boolean;
}
