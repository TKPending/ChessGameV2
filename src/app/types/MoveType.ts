import { TileType } from "./TileType";
import { PieceType } from "./PieceType";

export interface MoveType {
    piece: PieceType;
    from: TileType;
    to: TileType;
};