import { useDispatch } from "react-redux";
import {
  setErrorMessage,
  setErrorNotification,
} from "@/app/redux/slices/error/errorSlice";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

type Props = {
  tile: TileType;
};

const Piece = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const piece: PieceType | null = tile.pieceOnTile || null;
  if (!piece) {
    dispatch(setErrorNotification(true));
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
