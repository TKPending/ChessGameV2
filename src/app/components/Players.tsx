import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import CapturedPieces from "@/app/components/chessboardComponents/CapturedPieces";
import { PlayerType } from "@/app/types/PlayerType";

type Props = {
  playerNo: number;
  className: string;
};

const Players = ({ playerNo, className }: Props) => {
  const player: PlayerType = useSelector(
    (state: RootState) => state.board.players[playerNo]
  );

  return (
    <div className={`w-full flex flex-col ${className} justify-center`}>
      <p className={`text-xl text-white`}>{player.playerName}</p>
      <CapturedPieces player={player} />
    </div>
  );
};

export default Players;
