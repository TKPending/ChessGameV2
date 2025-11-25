import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import { resetChessGame } from "@/app/utils/resetChessGame";
import Checkmate from "./components/Checkmate";

// TODO: Batch reset states

const CheckmateContainer = () => {
  const dispatch = useDispatch();
  const [displayCheckmate, setDisplayCheckmate] = useState<boolean>(true);

  const handleResetGame = () => {
    resetChessGame(dispatch, { swapColors: true });
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
