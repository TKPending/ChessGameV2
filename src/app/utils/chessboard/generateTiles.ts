import { TileType, TileColor } from "@/app/types/TileType";
import { PieceType, PieceName } from "@/app/types/PieceTypes";

/**
 * Generate a board with each individual piece
 * @returns A chessboadrd filled with all the pieces in their starting pieces.
 */

export const generateTiles = (): TileType[][] => {
  const tiles: TileType[][] = [];

  const initialPieces = {
    0: [
      { pieceName: PieceName.rook, pieceColor: "Black" },
      { pieceName: PieceName.knight, pieceColor: "Black" },
      { pieceName: PieceName.bishop, pieceColor: "Black" },
      { pieceName: PieceName.queen, pieceColor: "Black" },
      {
        pieceName: PieceName.king,
        pieceColor: "Black",
        king: {
          hasMoved: false,
          inCheck: false,
          canCastle: true,
          checkmate: false,
        },
      },
      { pieceName: PieceName.bishop, pieceColor: "Black" },
      { pieceName: PieceName.knight, pieceColor: "Black" },
      { pieceName: PieceName.rook, pieceColor: "Black" },
    ],
    1: Array(8).fill({
      pieceName: PieceName.pawn,
      pieceColor: "Black",
      isPromotion: false,
    }),
    6: Array(8).fill({
      pieceName: PieceName.pawn,
      pieceColor: "White",
      isPromotion: false,
    }),
    7: [
      { pieceName: PieceName.rook, pieceColor: "White" },
      { pieceName: PieceName.knight, pieceColor: "White" },
      { pieceName: PieceName.bishop, pieceColor: "White" },
      { pieceName: PieceName.queen, pieceColor: "White" },
      {
        pieceName: PieceName.king,
        pieceColor: "White",
        king: {
          hasMoved: false,
          inCheck: false,
          canCastle: true,
          checkmate: false,
        },
      },
      { pieceName: PieceName.bishop, pieceColor: "White" },
      { pieceName: PieceName.knight, pieceColor: "White" },
      { pieceName: PieceName.rook, pieceColor: "White" },
    ],
  };

  for (let row = 0; row < 8; row++) {
    const tileRow: TileType[] = [];
    for (let col = 0; col < 8; col++) {
      const defaultTileColor =
        (row + col) % 2 === 0 ? TileColor.white : TileColor.black;
      const tilePosition = `${String.fromCharCode(97 + col)}${8 - row}`;

      let pieceOnTile: PieceType | null = null;

      //@ts-ignore
      if (initialPieces[row]) {
        const pieceConfig =
          initialPieces[row as keyof typeof initialPieces]?.[col];
        if (pieceConfig) {
          pieceOnTile = {
            ...pieceConfig,
            piecePosition: {
              tilePosition,
              tileColor: defaultTileColor,
              pieceOnTile: null,
              isHighlighted: false,
            },
            allMoves: [],
            validMoves: [],
            isAlive: true,
            hasMoved: false,
          };
        }
      }

      tileRow.push({
        defaultTileColor,
        tilePosition,
        currentTileColor: defaultTileColor,
        pieceOnTile,
        isHighlighted: false,
        highlightReason: "friendly",
      });
    }
    tiles.push(tileRow);
  }

  return tiles;
};
