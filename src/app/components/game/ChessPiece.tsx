import { useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";
import {
  setErrorMessage,
  setErrorNotification,
} from "@/app/redux/slices/error/errorSlice";

type Props = {
  tile: TileType;
};

const ChessPiece = ({ tile }: Props) => {
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
      className="p-4"
      src={`/${pieceColor.toLowerCase()}-${pieceName.toLowerCase()}.png`}
      alt={`${pieceColor} ${pieceName}`}
    />
  );
};

export default ChessPiece;
