import { setTileWithPromotedPiece } from "@/app/redux/slices/board/boardSlice";
import { PieceName } from "@/app/types/PieceType";
import { useDispatch } from "react-redux";
import { PieceType } from "@/app/types/PieceType";
import { setPawnPromotionMoveHistory } from "@/app/redux/slices/gameHistory/gameHistorySlice";

type Props = {
  currentTurn: "White" | "Black";
};

interface PromotionOptionType {
  name: PieceName;
  src: string;
  alt: string;
}

const PawnPromotion = ({ currentTurn }: Props) => {
  const dispatch = useDispatch();
  const pieceColor: "white" | "black" =
    currentTurn === "White" ? "black" : "white";
  const turnToChange: "White" | "Black" =
    currentTurn === "White" ? "Black" : "White";

  const promotionOptions: PromotionOptionType[] = [
    {
      name: PieceName.queen,
      src: "-queen",
      alt: "Queen Piece",
    },
    {
      name: PieceName.knight,
      src: "-knight",
      alt: "Knight Piece",
    },
    {
      name: PieceName.rook,
      src: "-rook",
      alt: "Rook Piece",
    },
    {
      name: PieceName.bishop,
      src: "-bishop",
      alt: "Bishop Piece",
    },
  ];

  const handlePiecePromotion = (pieceName: PieceName) => {
    const promotedPiece: PieceType = {
      pieceName,
      pieceColor: turnToChange,
      isAlive: true,
      hasMoved: false,
      isPromotion: false,
    };

    dispatch(
      setPawnPromotionMoveHistory({
        pawnPromotion: true,
        updatedPiece: pieceName,
      })
    );
    dispatch(setTileWithPromotedPiece(promotedPiece));
  };

  return (
    <div
      className={`z-50 h-screen w-screen bg-opacity-0 top-0 left-0 absolute flex items-center justify-center bg-black bg-opacity-20`}
    >
      <div className="border-2 border-customGreen bg-page-background h-32 flex flex-col text-customGreen gap-4 font-semibold px-2 items-center justify-center rounded-lg">
        <p>Promote your pawn</p>
        <div className="flex h-auto w-auto flex items-center justify-center">
          {promotionOptions.map((piece, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 w-20 hover:cursor-pointer hover:bg-customGreen hover:bg-opacity-20 transition duration-400 p-4"
              onClick={() => handlePiecePromotion(piece.name)}
            >
              <img
                src={`${pieceColor}${piece.src}.png`}
                alt={piece.alt}
                className="w-12 h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PawnPromotion;
