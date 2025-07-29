import Chessboard from "@/app/containers/chessboard/Chessboard";
import Players from "@/app/containers/players/Players";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessboardAndPlayersLayout = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-around p-2 gap-4">
      <div className="w-full flex items-center justify-end px-12">
        <Players playerNo={PLAYERONE} className="items-end" />
      </div>

      <div className="h-auto w-full flex items-center justify-center">
        <Chessboard />
      </div>

      <div className="w-full flex items-center justify-start px-12">
        <Players playerNo={PLAYERTWO} className="items-start" />
      </div>
    </div>
  );
};

export default ChessboardAndPlayersLayout;
