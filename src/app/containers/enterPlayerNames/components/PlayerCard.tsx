import { motion } from "framer-motion";
import { PlayerType } from "@/app/types/ChessTypes";

type PlayerCardProps = {
  player: PlayerType;
  onChange: (newValue: string, playerNo: number) => void;
  onEnter: () => void;
};

/**
 * Renders the card where users can enter the player names
 * @param player Redux Player State
 * @param onChange Handles changing the name in Redux
 * @param onEnter Handles submitting the data to Redux
 * @returns
 */
const PlayerCard = ({ player, onChange, onEnter }: PlayerCardProps) => {
  const isNamed: boolean = player.playerName.length >= 1;
  const color: "white" | "black" = player.no === 0 ? "white" : "black";

  return (
    <motion.div
      className={`
        relative flex flex-col items-center justify-between
        w-64 h-60 md:h-96 p-6 rounded-2xl shadow-xl transition-all
        ${
          color === "white"
            ? "bg-gradient-to-br from-gray-100 to-white"
            : "bg-gradient-to-br from-gray-800 to-gray-900"
        }
        ${isNamed ? "ring-4 ring-green-400" : "ring-2 ring-transparent"}
      `}
      whileHover={{ scale: 1.03 }}
    >
      <motion.img
        src={`${color}-king.png`}
        alt={`${color} king`}
        className="h-28 md:h-40"
        animate={{
          y: isNamed ? [0, -4, 0] : 0,
        }}
        transition={{
          repeat: isNamed ? Infinity : 0,
          duration: 2,
        }}
      />

      <motion.input
        type="text"
        autoComplete="off"
        placeholder="Enter name"
        maxLength={16}
        value={player.playerName}
        onChange={(e) => onChange(e.target.value, player.no)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
        className={`
          mt-4 w-full text-center font-semibold text-xl rounded-md outline-none
          ${
            color === "white"
              ? "bg-gray-200 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400"
              : "bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400"
          }
          py-2 transition-all
        `}
      />

      <motion.div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-green-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: isNamed ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default PlayerCard;
