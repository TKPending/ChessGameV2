import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
} from "@/app/types/ChessTypes";

type PlayerTimerProps = { playerNo: number };

const PlayerTimer = ({ playerNo }: PlayerTimerProps) => {
  const dispatch = useDispatch();
  const players: PlayerType[] = useSelector(selectPlayers);
  const currentTurn = useSelector(selectCurrentTurn);
  const timeSettings = useSelector(selectTimeSettings);

  const currentPlayer = players[playerNo];

  const [localTime, setLocalTime] = useState<number>(
    currentPlayer.remainingTime
  );

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

        if (
          newRemaining === 0 &&
          timeSettings.timeCategory !== TimeCatergories.infinite
        ) {
          dispatch(setWinner(currentPlayer));
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
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
