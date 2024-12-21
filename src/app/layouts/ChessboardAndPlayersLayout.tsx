import ChessboardContainer from "@/app/containers/chessboard/ChessboardContainer";
import PlayersComponent from "@/app/components/players/PlayersComponent";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessboardAndPlayersLayout = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full max-w-5xl mx-auto p-4 gap-4">
      <PlayersComponent playerNo={PLAYERONE} className="items-end" />
      <ChessboardContainer />
      <PlayersComponent playerNo={PLAYERTWO} className="items-start" />
    </div>
  );
};

export default ChessboardAndPlayersLayout;
