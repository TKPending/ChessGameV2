import { TileType } from "./TileType";
import { PieceName } from "./PieceType";

export interface MoveHistoryType {
  from: TileType;
  to: TileType;
  pawnPromotion?: boolean;
  updatedPiece?: PieceName;
}

export interface GameHistoryType {
  count: number;
  chessboardHistory: TileType[][][];
  moveHistory: MoveHistoryType[];
  isPreviousMovesHidden: boolean;
}
