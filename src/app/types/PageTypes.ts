import { ComponentType } from "react";
import BoardPage from "@/app/pages/BoardPage";
import EnterPlayerNamesPage from "@/app/pages/EnterPlayerNamesPage";
import GameSettingsPage from "@/app/pages/GameSettingsPage";
import LandingPage from "@/app/pages/LandingPage";
import RulesPage from "@/app/pages/RulesPage";

export const PageComponents: Record<string, ComponentType<any>> = {
  landing: LandingPage,
  gameRules: RulesPage,
  enterPlayerNames: EnterPlayerNamesPage,
  gameSettings: GameSettingsPage,
  board: BoardPage,
};

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
  enterPlayerNames = "enterPlayerNames",
  gameSettings = "gameSettings",
  board = "board",
}
