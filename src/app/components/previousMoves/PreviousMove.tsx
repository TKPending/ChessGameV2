import { PreviousMoveType } from "@/app/types/PreviousMoveType";

type Props = {
    move: PreviousMoveType;
};

const PreviousMove = ({ move }: Props) => {
    const piece = move.pieceToMove;
    const position = move.pieceToMove.piecePosition;

    return (
        <div className="bg-gray-800 h-14 w-full flex items-center justify-around px-4 rounded-md shadow-md">
            <span className="text-white text-sm font-semibold w-2/5 text-left">
                Move #{move.count}
            </span>

            <div className="text-gray-200 text-sm flex items-center justify-center gap-8 w-3/5">
                <span className="">{piece.pieceName}</span>
                <span className="text-gray-500 ">{`→`}</span>
                <span className="font-bold">{position.tilePosition.toUpperCase()}</span>
            </div>
        </div>
    );
};

export default PreviousMove;
