import { ComponentType } from "react";
import BoardPage from "@/app/pages/BoardPage";
import EnterPlayerNamesPage from "@/app/pages/EnterPlayerNamesPage";
import GameSettingsPage from "@/app/pages/GameSettingsPage";
import LandingPage from "@/app/pages/LandingPage";
import RulesPage from "@/app/pages/RulesPage";

export type TransitionType = {
  initial: { x: number | string; opacity: number };
  animate: { x: number | string; opacity: number };
  exit: { x: number | string; opacity: number };
};

export const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export enum PageEnum {
  landing = "landing",
  gameRules = "gameRules",
  enterPlayerNames = "enterPlayerNames",
  gameSettings = "gameSettings",
  board = "board",
}

export const pages = [
  PageEnum.landing, // 0
  PageEnum.enterPlayerNames, // 1
  PageEnum.gameSettings, // 2
  PageEnum.board, // 3
  PageEnum.gameRules, // 4
] as const;

export const PageComponents: Record<string, ComponentType<any>> = {
  landing: LandingPage, // 0
  enterPlayerNames: EnterPlayerNamesPage, // 1
  gameSettings: GameSettingsPage, // 2
  board: BoardPage, // 3
  gameRules: RulesPage, // 4
};
