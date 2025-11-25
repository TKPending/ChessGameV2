import { TimeCatergories } from "@/app/types/ChessTypes";

export const convertTimeCategory = (category: string): TimeCatergories => {
  switch (category) {
    case "Blitz":
      return TimeCatergories.blitz;
    case "Rapid":
      return TimeCatergories.rapid;
    default:
      return TimeCatergories.infinite;
  }
};

export const convertTimeToInt = (timeStr: string): number => {
  switch (timeStr) {
    case "1 Minutes":
      return 60;
    case "3 Minutes":
      return 180;
    case "5 Minutes":
      return 300;
    case "10 Minutes":
      return 600;
    default:
      return 0;
  }
};

export const showReadableTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};

export const incrementTime = (time: number, incrementTime: string): number => {
  switch (incrementTime) {
    case "5 Seconds":
      return time + 5;
    case "10 Seconds":
      return time + 10;
    case "15 Seconds":
      return time + 15;
    default:
      return time + 0;
  }
};
