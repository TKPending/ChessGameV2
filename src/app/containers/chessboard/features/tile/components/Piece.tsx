import { useDispatch } from "react-redux";
import {
  setErrorMessage,
  setError,
} from "@/app/redux/slices/gameState/gameStateSlice";
import { TileType, PieceType } from "@/app/types/ChessTypes";

type Props = {
  tile: TileType;
};

const Piece = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const piece: PieceType | null = tile.pieceOnTile || null;
  if (!piece) {
    dispatch(setError(true));
    dispatch(setErrorMessage("Problem loading images. Try refresh page"));
    return;
  }
  const { pieceColor, pieceName } = piece;

  return (
    <img
      className="p-4 min-h-14 min-w-14"
      src={`/${pieceColor.toLowerCase()}-${pieceName.toLowerCase()}.png`}
      alt={`${pieceColor} ${pieceName}`}
    />
  );
};

export default Piece;
