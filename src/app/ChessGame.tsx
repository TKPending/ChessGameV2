"use client";

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import GameLayout from "@/app/layouts/GameLayout";
import LandingPage from "./pages/LandingPage";
import RulesPage from "./pages/RulesPage";
import { PageTransitionType } from "./types/ChessTypes";
import EnterPlayersPage from "./pages/EnterPlayersPage";

const ChessGame = () => {
  const pageStatus: PageTransitionType = useSelector(
    (state: RootState) => state.pageTransition
  );
  const isPlaying: boolean = useSelector(
    (state: RootState) => state.gameState.isPlaying
  );

  return (
    <div className="min-h-screen w-screen bg-page-background">
      {pageStatus.landingStatus && <LandingPage />}
      {pageStatus.playerStatus && <EnterPlayersPage />}
      {pageStatus.readMoreStatus && <RulesPage />}
      {isPlaying && <GameLayout />}
    </div>
  );
};

export default ChessGame;
