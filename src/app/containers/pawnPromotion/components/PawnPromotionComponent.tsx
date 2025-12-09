import { useSelector } from "react-redux";
import ModalTemplate from "@/app/containers/modal/ModalTemplate";
import { selectCurrentTurn } from "@/app/utils/selectors/gameStateSelectors";
import { getPlayerColor } from "@/app/utils/getPlayerColor";
import { ChessColors, PieceName } from "@/app/types/ChessTypes";

type PawnPromotionComponentProps = {
  handlePiecePromotion: (pieceName: PieceName) => void;
};

interface PromotionOptionType {
  name: PieceName;
  src: string;
  alt: string;
}

/**
 * Renders the modal for pawn promotion
 * @param {PieceName} name Name of the piece being promoted
 * @param {string} src URL to the image to render
 * @param {string} alt alternate text for the image
 * @returns Pawn Promotion Modal
 */
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
    <ModalTemplate>
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
    </ModalTemplate>
  );
};

export default PawnPromotionComponent;
