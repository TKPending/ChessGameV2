"use client";

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import LandingLayout from "@/app/layouts/LandingLayout";
import GameLayout from "@/app/layouts/GameLayout";

const ChessGame = () => {
  const isPlaying: boolean = useSelector(
    (state: RootState) => state.gameState.isPlaying
  );

  return (
    <div className="h-screen w-screen bg-page-background">
      {isPlaying ? <GameLayout /> : <LandingLayout />}
    </div>
  );
};

export default ChessGame;
