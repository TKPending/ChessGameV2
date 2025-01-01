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
    <div className="h-screen w-screen flex flex-col md:flex-row gap-6 justify-center p-6">
      {isError && <ErrorContainer />}
      <ChessboardAndPlayersLayout />
      <GameHistoryContainer />
    </div>
  );
};

export default GameLayout;
