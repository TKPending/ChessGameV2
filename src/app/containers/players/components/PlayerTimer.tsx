import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayers,
  selectCurrentTurn,
  selectTimeSettings,
  selectIsPlaying,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  setPlayerTime,
  setWinnerByTime,
} from "@/app/redux/slices/gameState/gameStateSlice";

import { showReadableTime } from "@/app/utils/convertTimeSettings";
import {
  ChessColors,
  PlayerType,
  TimeCatergories,
  TimeType,
} from "@/app/types/ChessTypes";

type PlayerTimerProps = { player: PlayerType };

/**
 * Renders the timer for each player
 * @param {PlayerType} player Holds the information on said player
 * @returns Player Timer
 */
const PlayerTimer = ({ player }: PlayerTimerProps) => {
  const dispatch = useDispatch();
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const players: PlayerType[] = useSelector(selectPlayers);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const timeSettings: TimeType = useSelector(selectTimeSettings);
  const isActivePlayer = player.team === currentTurn;

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Active Player Timer
    if (!isActivePlayer) return;

    if (isPlaying) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (player.remainingTime === 0) {
        dispatch(setWinnerByTime());
        return;
      }

      intervalRef.current = window.setInterval(() => {
        const latestPlayer: PlayerType = player;

        // Player has ran out of time
        if (latestPlayer.remainingTime <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          if (timeSettings.timeCategory !== TimeCatergories.infinite) {
            dispatch(setWinnerByTime());
          }

          return;
        }

        // Update Player Time
        dispatch(
          setPlayerTime({
            currentPlayer: latestPlayer,
            newTime: latestPlayer.remainingTime - 1,
          })
        );
      }, 1000);

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
    // Reset Interval
  }, [isActivePlayer, players, player.no, dispatch, timeSettings]);

  return (
    <p className="text-xl text-yellow-200">
      {showReadableTime(player.remainingTime)}
    </p>
  );
};

export default PlayerTimer;
