import { TileType, TileColor } from "@/app/types/TileType";

export const generateTiles = (tiles: TileType[]) => {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const tileColor = (row + col) % 2 === 0 ? TileColor.white : TileColor.black;
          const tilePosition = `${String.fromCharCode(65 + col)}${8 - row}`;
          tiles.push({
            tilePosition,
            tileColor,
            pieceOnTile: null,
            isHighlighted: false,
          });
        }
      }
};