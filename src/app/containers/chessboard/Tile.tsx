import { PieceType } from "@/app/types/PieceType";
import { TileColor, TileType } from "@/app/types/TileType";

type Props = {
  tile: TileType;
};

const Tile = ({ tile }: Props) => {
  const piece: PieceType | null = tile.pieceOnTile || null;

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
      {piece && (
        <img
          className="p-4"
          src={`/${tile.pieceOnTile?.pieceColor}-${tile.pieceOnTile?.pieceName}.png`}
          alt={`${tile.pieceOnTile?.pieceColor} ${tile.pieceOnTile?.pieceName}`}
        />
      )}
    </div>
  );
};

export default Tile;
