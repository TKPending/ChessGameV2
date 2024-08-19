import { TileColor, TileType } from "@/app/types/TileType";
import { MoveType } from "@/app/types/MoveType";
import { PieceType } from "@/app/types/PieceType";

export default class Tile {
  private tilePosition: string;
  private tileColor: TileColor;
  private pieceOnTile: PieceType | null;
  private isHighlighted: boolean;

  constructor(position: string, tileColor: TileColor) {
    this.tilePosition = position;
    this.tileColor = tileColor;
    this.pieceOnTile = null;
    this.isHighlighted = false;
  }

  get getTilePosition(): string {
    return this.tilePosition;
  };

  get getPieceOnTile(): PieceType {
    return this.pieceOnTile!;
  };

  set highlightTile(piece): null {
    this.isHighlighted = true;
  }

}
