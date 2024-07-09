import { RootState } from "@/app/redux/store";
import { PlayerType } from "@/app/types/PlayerType";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "@/app/components/TextInput";

const CustomTimes = () => {
    const players: PlayerType[] = useSelector((state: RootState) => state.board.players);

    return (
        <div className="flex gap-12 items-center justify-center">
            {players.map((player: PlayerType, index: number) => (
                <div key={index} className="flex flex-col gap-4 items-center justify-center">
                    <p>{player.playerName}</p>
                    <div className="bg-white h-12 w-32"></div>
                </div>
            ))}
        </div>
    )
};

export default CustomTimes;
