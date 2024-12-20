import { TileType } from "./TileType";

export interface CastleType {
  whiteKing: {
    kingPosition: [number, number];
    kingMoved: boolean;
  };
  blackKing: {
    kingPosition: [number, number];
    kingMoved: boolean;
  };
  black: {
    canCastleOption: boolean;
    rightCastleOption: boolean;
    leftCastleOption: boolean;
  };
  white: {
    canCastleOption: boolean;
    rightCastleOption: boolean;
    leftCastleOption: boolean;
  };
}
