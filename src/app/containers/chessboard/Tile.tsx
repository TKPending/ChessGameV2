import { TileColor, TileType } from "@/app/types/TileType";

type Props = {
    tile: TileType;
}

const Tile = ({ tile }: Props) => {
    return (
        <div
          key={tile.tilePosition}
          className={`flex items-center justify-center ${
            tile.tileColor === TileColor.white ? "bg-gray-200" : "bg-gray-800"
          }`}
          style={{
            aspectRatio: "1",
          }}
        >
          <p className="text-xs text-black">{tile.tilePosition}</p>
        </div>
    )
};

export default Tile;