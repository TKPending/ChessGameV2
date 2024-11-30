import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ChessGameLayout from "@/app/layouts/ChessGameLayout";
import PreviousMovesContainer from "@/app/containers/chessboard/PreviousMovesContainer";
import DisplayMoves from "@/app/components/previousMoves/DisplayMoves";

const ChessboardLayout = () => {
  const previousMovesHidden: boolean = useSelector(
      (state: RootState) => state.previousMovesContainer.previousMovesHidden
  );

  return (
      <div className="h-screen w-screen bg-black flex flex-col md:flex-row gap-6 justify-center p-6">
          <ChessGameLayout />
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

export default ChessboardLayout;

