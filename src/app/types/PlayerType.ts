import { PieceType } from "./PieceType";

export enum Team {
    white = "White",
    black =  "Black",
};

export interface PlayerType {
  no: number;
  playerName: string;
  team: Team; 
  capturedPieces: PieceType[];
  remainingTime: string;
  isInCheck?: boolean;
  isInCheckmate?: boolean;
};
