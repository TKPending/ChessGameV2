export enum Team {
    white = "White",
    black =  "Black",
};

export interface PlayerType {
  playerName: string;
  team: Team; // Enum
  remainingTime: string;
  isInCheck?: boolean; // Boolean to indicate if the player is in check
  isInCheckmate?: boolean;
};
