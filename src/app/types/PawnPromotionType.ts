import { TileType } from "./TileType";
import { PieceName, PieceType } from "./PieceType";

export interface PawnPromotionType {
  isPawnPromotion: boolean;
  tileToUpdate: TileType | null;
}
