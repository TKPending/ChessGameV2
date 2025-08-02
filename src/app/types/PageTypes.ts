import LandingPage from "../pages/LandingPage";
import EnterPlayersPage from "../pages/EnterPlayersPage";
import RulesPage from "../pages/RulesPage";
import GameLayout from "../layouts/GameLayout";
import { ComponentType } from "react";

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
  enterPlayers = "enterPlayers",
  chessGame = "chessGame",
}

export const PageComponents: Record<string, ComponentType<any>> = {
  landing: LandingPage,
  gameRules: RulesPage,
  enterPlayers: EnterPlayersPage,
  chessGame: GameLayout,
};

export type PageState = {
  currentPage: string;
  prevPage: string;
};
