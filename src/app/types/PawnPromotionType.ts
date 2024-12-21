import { TileType } from "./TileType";
import { PieceType } from "./PieceType";

export interface PawnPromotionType {
  isPawnPromotion: boolean;
  tileToUpdate: TileType | null;
}
