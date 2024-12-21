import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ChessboardAndPlayersLayout from "@/app/layouts/ChessboardAndPlayersLayout";
import PreviousMovesContainer from "@/app/containers/PreviousMovesContainer";
import DisplayMoves from "@/app/components/previousMoves/DisplayMoves";
import ErrorNotification from "@/app/components/ErrorNotification";

const GameLayout = () => {
  const previousMovesHidden: boolean = useSelector(
    (state: RootState) => state.gameHistory.isPreviousMovesHidden
  );
  const isError: boolean = useSelector(
    (state: RootState) => state.error.isError
  );

  return (
    <div className="h-screen w-screen bg-black flex flex-col md:flex-row gap-6 justify-center p-6">
      {isError && <ErrorNotification />}
      <ChessboardAndPlayersLayout />
      <div
        className={`${
          previousMovesHidden ? "w-[20%]" : "w-[8%]"
        } max-w-sm pt-[5%] flex flex-col`}
      >
        <DisplayMoves />
        {previousMovesHidden && <PreviousMovesContainer />}
      </div>
    </div>
  );
};

export default GameLayout;
