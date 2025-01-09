import ChessboardContainer from "@/app/containers/ChessboardContainer";
import Players from "@/app/components/Players";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessboardAndPlayersLayout = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-around p-2 gap-8">
      <div className="w-full flex items-center justify-end">
        <Players playerNo={PLAYERONE} className="items-end" />
      </div>

      <div className="h-auto w-full flex items-center justify-center">
        <ChessboardContainer />
      </div>

      <div className="w-full flex items-center justify-start">
        <Players playerNo={PLAYERTWO} className="items-start" />
      </div>
    </div>
  );
};

export default ChessboardAndPlayersLayout;
