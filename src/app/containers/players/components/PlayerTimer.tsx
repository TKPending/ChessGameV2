import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlayers,
  selectCurrentTurn,
  selectTimeSettings,
} from "@/app/utils/selectors/gameStateSelectors";
import {
  setPlayerTime,
  setWinner,
} from "@/app/redux/slices/gameState/gameStateSlice";

import { showReadableTime } from "@/app/utils/convertTimeSettings";
import {
  ChessColors,
  PlayerType,
  TimeCatergories,
  TimeType,
} from "@/app/types/ChessTypes";

type PlayerTimerProps = { playerNo: number };

const PlayerTimer = ({ playerNo }: PlayerTimerProps) => {
  const dispatch = useDispatch();
  const players: PlayerType[] = useSelector(selectPlayers);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const timeSettings: TimeType = useSelector(selectTimeSettings);

  const currentPlayer = players[playerNo];
  const isActivePlayer = currentPlayer.team === currentTurn;

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset Interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Active Player Timer
    if (!isActivePlayer) return;

    intervalRef.current = window.setInterval(() => {
      const latestPlayer = players[playerNo];

      // Player has ran out of time
      if (latestPlayer.remainingTime <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;

        if (timeSettings.timeCategory !== TimeCatergories.infinite) {
          dispatch(setWinner(latestPlayer));
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
  }, [isActivePlayer, players, playerNo, dispatch, timeSettings]);

  return <p>{showReadableTime(currentPlayer.remainingTime)}</p>;
};

export default PlayerTimer;
