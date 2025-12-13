import { PlayerType } from "@/app/types/ChessTypes";

type PlayerNameProps = {
  player: PlayerType;
};

/**
 * Renders the player name and icon
 * @param {PlayerType} player Holds the information on a player
 * @returns Player Name and Team King Icon
 */
export const PlayerName = ({ player }: PlayerNameProps) => {
  return (
    <div className="flex gap-2">
      <p className="font-bold text-xl">{player.playerName}</p>
      <img
        src={`${player.team.toLowerCase()}-king.png`}
        className="h-6 w-6"
        alt={`${player.team} king piece`}
      />
    </div>
  );
};

export default PlayerName;
