import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ChessGameLayout from "@/app/layouts/ChessGameLayout";
import PreviousMovesContainer from "@/app/containers/chessboard/PreviousMovesContainer";


const ChessboardLayout = () => {
  const completelyHidePreviousMovesContainer: boolean = useSelector((state: RootState) => state.previousMovesContainer.fullscreen);
  return (
    <div className="overscroll-none h-screen w-screen max-h-screen max-w-screen bg-black flex flex-col md:flex-row gap-6 justify-center p-6 overflow-hidden px-12">
      <ChessGameLayout />
      {!completelyHidePreviousMovesContainer && <PreviousMovesContainer />}
    </div>
  );
};

export default ChessboardLayout;
