// Converts [row, col] -> "a1" style
export const convertCoordsToTile = (moves: number[][]): string[] => {
  return moves.map(([row, col]) => {
    const file = String.fromCharCode("a".charCodeAt(0) + col); // 0 → 'a'
    const rank = 8 - row; // 0 → 8, 7 → 1
    return `${file}${rank}`;
  });
};
