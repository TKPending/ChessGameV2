export const convertTilePosition = (tilePosition: string): [number, number] => {
  const col = tilePosition.charCodeAt(0) - "a".charCodeAt(0);
  const row = 8 - parseInt(tilePosition[1], 10);
  return [row, col];
};
