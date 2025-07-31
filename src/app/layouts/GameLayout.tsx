import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ChessboardAndPlayersLayout from "@/app/layouts/ChessboardAndPlayersLayout";
import ChessMoves from "@/app/containers/chessMoves/ChessMoves";
import ErrorContainer from "@/app/containers/ErrorContainer";

const GameLayout = () => {
  const isError: boolean = useSelector(
    (state: RootState) => state.gameState.error.isError
  );

  return (
    <div className="h-screen w-screen max-h-screen max-w-screen overflow-hidden">
      {isError && <ErrorContainer />}
      <div className="h-full w-full flex flex-col items-center md:flex-row gap-4 p-2">
        <ChessboardAndPlayersLayout />
        <ChessMoves />
      </div>
    </div>
  );
};

export default GameLayout;
