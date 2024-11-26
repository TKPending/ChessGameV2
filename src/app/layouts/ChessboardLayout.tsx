import ChessGameLayout from "@/app/layouts/ChessGameLayout";
import PreviousMovesContainer from "@/app/containers/chessboard/PreviousMovesContainer";

const ChessboardLayout = () => {
  return (
    <div className="h-screen w-screen bg-black flex flex-col md:flex-row gap-6 items-center justify-center p-6 overflow-hidden px-12">
      <ChessGameLayout />
      <PreviousMovesContainer />
    </div>
  );
};

export default ChessboardLayout;
