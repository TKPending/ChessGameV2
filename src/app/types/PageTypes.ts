import { ComponentType } from "react";
import ChessGamePage from "@/app/pages/ChessGamePage";
import GamePlayerPage from "@/app/pages/gameSetup/GamePlayerPage";
import GameSetupPage from "@/app/pages/gameSetup/GameSetupPage";
import LandingPage from "@/app/pages/LandingPage";
import RulesPage from "@/app/pages/RulesPage";

export type TransitionType = {
  initial: { x: number | string; opacity: number };
  animate: { x: number | string; opacity: number };
  exit: { x: number | string; opacity: number };
};

export const enterFromRight: TransitionType = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export const exitToLeft: TransitionType = {
  initial: { x: 0, opacity: 1 },
  animate: { x: "-200%", opacity: 0 },
  exit: { x: "-200%", opacity: 0 },
};

export enum PageEnum {
  landing = "landing",
  gameRules = "gameRules",
  gamePlayers = "gamePlayers",
  chessGame = "chessGame",
  gameSetup = "gameSetup",
}

export const PageComponents: Record<string, ComponentType<any>> = {
  landing: LandingPage,
  gameRules: RulesPage,
  gamePlayers: GamePlayerPage,
  chessGame: ChessGamePage,
  gameSetup: GameSetupPage,
};
