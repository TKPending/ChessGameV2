import { TileType } from "./TileType";
import { PieceType } from "./PieceType";

export interface MoveType {
    from: TileType;
    to: TileType;
};