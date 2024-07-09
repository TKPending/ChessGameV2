export enum Team {
    white = "White",
    black =  "Black",
};

export interface PlayerType {
  no: number;
  playerName: string;
  team: Team; 
  remainingTime: string;
  isInCheck?: boolean;
  isInCheckmate?: boolean;
};
