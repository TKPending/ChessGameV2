import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ChessboardAndPlayersLayout from "@/app/layouts/ChessboardAndPlayersLayout";
import MoveHistoryContainer from "@/app/containers/MoveHistoryContainer";
import DisplayMovesHistory from "@/app/components/moveHistoryComponents/DisplayMoveHistory";
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
        <DisplayMovesHistory />
        {previousMovesHidden && <MoveHistoryContainer />}
      </div>
    </div>
  );
};

export default GameLayout;
