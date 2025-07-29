import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import { resetChessMoves } from "@/app/redux/slices/chessMoves/chessMovesSlice";
import { resetChessboard } from "@/app/redux/slices/chessboard/chessboardSlice";
import Checkmate from "./components/Checkmate";

// TODO: Batch reset states

const CheckmateContainer = () => {
  const dispatch = useDispatch();
  const [displayCheckmate, setDisplayCheckmate] = useState<boolean>(true);

  const handleResetGame = () => {
    dispatch(resetChessMoves());
    dispatch(resetChessboard());
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
