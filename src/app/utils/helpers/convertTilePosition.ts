export const convertTilePosition = (tilePosition: string): [number, number] => {
  const col = tilePosition.charCodeAt(0) - "a".charCodeAt(0); // Converts 'a' to 0, 'b' to 1, ..., 'h' to 7
  const row = 8 - parseInt(tilePosition[1], 10); // Converts '1' to 7, '2' to 6, ..., '8' to 0
  return [row, col];
};
