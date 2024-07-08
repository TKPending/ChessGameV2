export enum Team {
    white = "White",
    black =  "Black",
};

export interface PlayerType {
  playerName: string;
  team: Team; 
  remainingTime: string;
  isInCheck?: boolean;
  isInCheckmate?: boolean;
};
