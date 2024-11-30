import { PlayerType } from "@/app/types/PlayerType";
import { PieceType } from "@/app/types/PieceType";

type Props = {
    player: PlayerType;
}

const DisplayCapturedPieces = ({ player }: Props) => {
    const capturedPieces: PieceType[] = player.capturedPieces;

    return (
        <div className="flex gap-2">
            {capturedPieces.map((piece, index) => (
                <div key={index} className="h-8 w-8">
                    <img src={`/${piece.pieceColor}-${piece.pieceName}.png`} className="h-6 w-6 bg-gray-200" />
                </div>
            ))}
        </div>
    )
};

export default DisplayCapturedPieces;