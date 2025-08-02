"use client";

import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import GameLayout from "@/app/layouts/GameLayout";
import LandingPage from "./pages/LandingPage";
import RulesPage from "./pages/RulesPage";
import { PageTransitionType } from "./types/ChessTypes";

const ChessGame = () => {
  const dispatch = useDispatch();
  const pageStatus: PageTransitionType = useSelector(
    (state: RootState) => state.pageTransition
  );
  const isPlaying: boolean = useSelector(
    (state: RootState) => state.gameState.isPlaying
  );

  return (
    <div className="min-h-screen w-screen bg-page-background">
      {pageStatus.landingStatus && <LandingPage />}
      {pageStatus.playerStatus && <></>}
      {pageStatus.readMoreStatus && <RulesPage />}
      {isPlaying && <GameLayout />}
    </div>
  );
};

export default ChessGame;
