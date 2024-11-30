import { TileType } from "./TileType";

export interface PlayingTileType {
    currentTile: TileType | null;
    previousTile: TileType | null;
    potentialCapture: TileType[];
}