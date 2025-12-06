import { useSelector } from "react-redux";
import { ChessColors, PieceName } from "@/app/types/ChessTypes";
import { selectCurrentTurn } from "@/app/utils/selectors/gameStateSelectors";
import { getPlayerColor } from "@/app/utils/getPlayerColor";

type PawnPromotionComponentProps = {
  handlePiecePromotion: (pieceName: PieceName) => void;
};

interface PromotionOptionType {
  name: PieceName;
  src: string;
  alt: string;
}

const PawnPromotionComponent = ({
  handlePiecePromotion,
}: PawnPromotionComponentProps) => {
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const pieceColor: ChessColors = getPlayerColor(currentTurn, true);

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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm`}
    >
      <div
        className="absolute inset-0 pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(255,215,128,0.12),transparent_70%)]"
      />

      <div
        className="
        relative w-[500px] max-w-[92%]
        bg-[rgba(12,12,14,0.86)]
        backdrop-blur-xl
        border border-[rgba(255,215,128,0.35)]
        rounded-3xl shadow-[0_10px_45px_rgba(0,0,0,0.7)]
        p-12 flex flex-col items-center gap-10
        animate-premiumPop
        "
      >
        <p className="text-white font-semibold text-xl">Promote your pawn</p>

        <div className="flex h-auto w-auto flex items-center justify-center">
          {promotionOptions.map((piece, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 w-20 hover:cursor-pointer duration-400 p-4 hover:bg-customGreen/80 
            text-white hover:shadow-[0_0_20px_rgba(50,200,120,0.6)] transition-all w-auto rounded-lg"
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

export default PawnPromotionComponent;
