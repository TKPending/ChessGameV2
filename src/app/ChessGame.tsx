"use client";

import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import GameLayout from "@/app/layouts/GameLayout";
import LandingPage from "./pages/LandingPage";
import { setIsGamePlaying } from "./redux/slices/gameState/gameStateSlice";
import RulesPage from "./pages/RulesPage";

const ChessGame = () => {
  const dispatch = useDispatch();
  const isPlaying: boolean = useSelector(
    (state: RootState) => state.gameState.isPlaying
  );
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);

  const handlePageChange = (page: boolean) => {
    setIsLandingPage(page);
    if (page) {
      dispatch(setIsGamePlaying(true));
    }
  };

  return (
    <div className="min-h-screen w-screen bg-page-background">
      {isLandingPage ? (
        <LandingPage handlePageChange={handlePageChange} />
      ) : (
        <RulesPage handlePageChange={handlePageChange} />
      )}

      {isPlaying && <GameLayout />}
    </div>
  );
};

export default ChessGame;
