import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import DisplayCapturedPieces from "@/app/components/game/DisplayCapturedPieces";
import { PlayerType } from "@/app/types/PlayerType";

type Props = {
    playerNo: number;
    className: string;
}

const PlayersComponent = ({ playerNo, className}: Props) => {
    const player: PlayerType = useSelector((state: RootState) => state.board.players[playerNo]);
    const turn: string = useSelector((state: RootState) => state.board.currentTurn);
    const teamColor: string = player.team.toLowerCase();

    return (
        <div className={`w-full flex flex-col ${className} justify-center`}>
            <p className={`text-xl text-white`}>{player.playerName}</p>
            <DisplayCapturedPieces  player={player} />
        </div>
    )
};

export default PlayersComponent;