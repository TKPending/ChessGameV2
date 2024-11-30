import { PlayerType } from "@/app/types/PlayerType";
import { PieceType } from "@/app/types/PieceType";

type Props = {
    player: PlayerType;
}

const DisplayCapturedPieces = ({ player }: Props) => {
    const capturedPieces: PieceType[] = player.capturedPieces;
    const tempCapture = [1,2,3,4];

    return (
        <div className="flex gap-2">
            {tempCapture.map((index) => (
                <div key={index} className="h-12 w-8 bg-red-200"></div>
            ))}
        </div>
    )
};

export default DisplayCapturedPieces;