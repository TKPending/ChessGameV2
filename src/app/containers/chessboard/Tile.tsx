import { useSelector } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { TileColor, TileType } from "@/app/types/TileType";
import { RootState } from "@/app/redux/store";

type Props = {
  tile: TileType;
};

const Tile = ({ tile }: Props) => {
  const currentTurn: "White" | "Black" = useSelector((state: RootState) => state.board.currentTurn);
  const piece: PieceType | null = tile.pieceOnTile || null;

  return (
    <div
      key={tile.tilePosition}
      className={`flex items-center justify-center ${
        tile.tileColor === TileColor.white ? "bg-gray-200" : "bg-gray-800"
      } ${currentTurn == piece?.pieceColor && "hover:bg-red-200"}`}
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
