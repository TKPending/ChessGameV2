export const isPawnInStartingPosition = (
  pieceColor: "White" | "Black",
  currentRow: number
): boolean => {
  return (
    (pieceColor === "White" && currentRow === 6) ||
    (pieceColor === "Black" && currentRow === 1)
  );
};

export const isPawnAtPromotionRow = (
  pieceColor: "White" | "Black",
  currentRow: number
): boolean => {
  return (
    (pieceColor === "White" && currentRow === 0) ||
    (pieceColor === "Black" && currentRow === 7)
  );
};
