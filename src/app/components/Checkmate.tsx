import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { RootState } from "@/app/redux/store";
import { resetGame } from "@/app/redux/slices/board/boardSlice";
import { resetGameHistory } from "@/app/redux/slices/gameHistory/gameHistorySlice";
import CheckmateButtons from "@/app/components/checkmateComponents/CheckmateButtons";
import { PlayerType } from "@/app/types/PlayerType";

const Checkmate = () => {
  const dispatch = useDispatch();
  const [displayCheckmate, setDisplayCheckmate] = useState<boolean>(true);
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const players: PlayerType[] = useSelector(
    (state: RootState) => state.board.players
  );

  const winner = currentTurn === "White" ? players[0] : players[1];

  const { width, height } = useWindowSize();

  const handleResetGame = () => {
    dispatch(resetGame());
    dispatch(resetGameHistory());
  };

  const handleExit = () => {
    setDisplayCheckmate(false);
  };

  return (
    <div
      className={`${
        displayCheckmate ? "flex" : "hidden"
      } z-50 h-screen w-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 p-4`}
    >
      {/* Confetti background */}
      <Confetti width={width} height={height} numberOfPieces={200} />

      <div className="w-[400px] flex flex-col items-center gap-6 border-2 border-customGreen bg-page-background p-4 rounded-lg relative">
        <div className="flex flex-col items-center justify-start">
          <p className="text-white text-3xl">Checkmate!</p>
          <p className="text-customGreen">{`${winner.playerName} has won`}</p>
          <img
            src={`${currentTurn === "White" ? "Black" : "White"}-king.png`}
            className="h-20 w-20"
          />
        </div>

        <div className="flex gap-6 w-auto">
          <CheckmateButtons
            text="Play Again"
            className="bg-customGreen"
            onClick={handleResetGame}
          />
          <CheckmateButtons
            text="Exit"
            className="bg-red-400 text-white"
            onClick={handleExit}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkmate;
