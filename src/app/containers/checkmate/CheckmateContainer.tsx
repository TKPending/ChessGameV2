import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import { resetGame } from "@/app/redux/slices/old/board/boardSlice";
import { resetGameHistory } from "@/app/redux/slices/old/gameHistory/gameHistorySlice";
import Checkmate from "./components/Checkmate";

const CheckmateContainer = () => {
  const dispatch = useDispatch();
  const [displayCheckmate, setDisplayCheckmate] = useState<boolean>(true);

  const handleResetGame = () => {
    dispatch(resetGame());
    dispatch(resetGameHistory());
  };

  const handleExit = () => {
    setDisplayCheckmate(false);
  };

  return (
    <Checkmate
      displayCheckmate={displayCheckmate}
      handleResetGame={handleResetGame}
      handleExit={handleExit}
    />
  );
};

export default CheckmateContainer;
