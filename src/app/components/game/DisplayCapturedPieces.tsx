import { PlayerType } from "@/app/types/PlayerType";
import { PieceType } from "@/app/types/PieceType";

type Props = {
    player: PlayerType;
}

const DisplayCapturedPieces = ({ player }: Props) => {
    const capturedPieces: PieceType[] = player.capturedPieces;
    const tempCapture = ["/white-king.png", "/white-king.png", "/white-king.png", "/white-king.png"];

    return (
        <div className="flex gap-2">
            {tempCapture.map((image, index) => (
                <div key={index} className="h-8 w-8">
                    <img src={image}/>
                </div>
            ))}
        </div>
    )
};

export default DisplayCapturedPieces;