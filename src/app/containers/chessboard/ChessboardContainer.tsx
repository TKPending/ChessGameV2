import { TileType, TileColor } from "@/app/types/TileType";
import { generateTiles } from "@/app/utils/generateTiles";
import Tile from "./Tile";

const ChessboardContainer = () => {
    const tiles: TileType[] = [];
  
    generateTiles(tiles);
  
    return (
      <div className="grid grid-cols-8 grid-rows-8 aspect-square w-full max-w-[80%] max-h-[80%] bg-gray-700">
        {tiles.map((tile) => (
          <Tile key={tile.tilePosition} tile={tile} />
        ))}
      </div>
    );
  };
  
  export default ChessboardContainer;
  