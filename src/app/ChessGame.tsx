"use client";

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PlayerSetupLayout from "@/app/layouts/playerSetup/PlayerSetupLayout";
import GameLayout from "@/app/layouts/GameLayout";

const ChessGame = () => {
  const isPlaying: boolean = useSelector(
    (state: RootState) => state.board.isPlaying
  );

  return (
    <div className="h-screen w-screen bg-page-background">
      {isPlaying ? <GameLayout /> : <PlayerSetupLayout />}
    </div>
  );
};

export default ChessGame;
