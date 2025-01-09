import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ChessboardAndPlayersLayout from "@/app/layouts/ChessboardAndPlayersLayout";
import GameHistoryContainer from "@/app/containers/GameHistoryContainer";
import ErrorContainer from "@/app/containers/ErrorContainer";

const GameLayout = () => {
  const isError: boolean = useSelector(
    (state: RootState) => state.error.isError
  );

  return (
    <div className="h-screen w-screen p-4">
      {isError && <ErrorContainer />}
      <div className="h-full w-full flex flex-col md:flex-row gap-4">
        <ChessboardAndPlayersLayout />
        <GameHistoryContainer />
      </div>
    </div>
  );
};

export default GameLayout;
