import ChessboardContainer from "@/app/containers/ChessboardContainer";
import Players from "@/app/components/Players";

const PLAYERONE = 0;
const PLAYERTWO = 1;

const ChessboardAndPlayersLayout = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full max-w-5xl mx-auto p-4 gap-4">
      <Players playerNo={PLAYERONE} className="items-end" />
      <ChessboardContainer />
      <Players playerNo={PLAYERTWO} className="items-start" />
    </div>
  );
};

export default ChessboardAndPlayersLayout;
