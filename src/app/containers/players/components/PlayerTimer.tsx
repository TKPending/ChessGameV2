import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlayers,
  selectCurrentTurn,
} from "@/app/utils/selectors/gameStateSelectors";
import { setPlayerTime } from "@/app/redux/slices/gameState/gameStateSlice";
import { PlayerType } from "@/app/types/ChessTypes";
import { showReadableTime } from "@/app/utils/convertTimeSettings";

type PlayerTimerProps = { playerNo: number };

const PlayerTimer = ({ playerNo }: PlayerTimerProps) => {
  const dispatch = useDispatch();
  const players: PlayerType[] = useSelector(selectPlayers);
  const currentTurn = useSelector(selectCurrentTurn);

  const currentPlayer = players[playerNo];

  // local state shown in UI (seconds)
  const [localTime, setLocalTime] = useState<number>(
    currentPlayer.remainingTime
  );

  // refs for timing logic
  const intervalRef = useRef<number | null>(null);
  const startTsRef = useRef<number | null>(null);
  const baseTimeRef = useRef<number>(currentPlayer.remainingTime);

  const isActivePlayer = currentTurn === currentPlayer.team;

  useEffect(() => {
    setLocalTime(currentPlayer.remainingTime);
    baseTimeRef.current = currentPlayer.remainingTime;
    startTsRef.current = null;
  }, [currentPlayer.remainingTime]);

  useEffect(() => {
    const computeRemaining = () => {
      if (startTsRef.current === null) return baseTimeRef.current;
      const elapsedMs = Date.now() - startTsRef.current;
      const elapsedSec = Math.floor(elapsedMs / 1000);
      return Math.max(baseTimeRef.current - elapsedSec, 0);
    };

    if (isActivePlayer) {
      if (startTsRef.current === null) {
        startTsRef.current = Date.now();
        baseTimeRef.current = localTime;
      }

      intervalRef.current = window.setInterval(() => {
        const newRemaining = computeRemaining();
        setLocalTime(newRemaining);
      }, 200);

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const finalRemaining = computeRemaining();
      setLocalTime(finalRemaining);
      baseTimeRef.current = finalRemaining;
      startTsRef.current = null;

      dispatch(setPlayerTime({ currentTurn, newTime: finalRemaining }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivePlayer]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // compute 'final' remaining using refs
      const finalRemaining = (() => {
        if (startTsRef.current === null) return baseTimeRef.current;
        const elapsedSec = Math.floor((Date.now() - startTsRef.current) / 1000);
        return Math.max(baseTimeRef.current - elapsedSec, 0);
      })();

      dispatch(setPlayerTime({ currentTurn, newTime: finalRemaining }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>{showReadableTime(localTime)}</p>;
};

export default PlayerTimer;
