import Tile from "@/app/containers/chessboard/features/tile/components/Tile";
import { TileType } from "@/app/types/ChessTypes";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const handleTileClick = () => {};

  return <Tile tile={tile} handleTileClick={handleTileClick} />;
};

export default TileContainer;
