import ChessboardContainer from "@/app/containers/ChessboardContainer";
import Players from "@/app/components/Players";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessboardAndPlayersLayout = () => {
  return (
    <div className="flex flex-col justify-between items-center h-full w-full max-w-5xl mx-auto p-4 gap-2">
      <div className="w-full flex items-center justify-end">
        <Players playerNo={PLAYERONE} className="items-end" />
      </div>

      <ChessboardContainer />
      <div className="w-full flex items-center justify-start">
        <Players playerNo={PLAYERTWO} className="items-start" />
      </div>
    </div>
  );
};

export default ChessboardAndPlayersLayout;
