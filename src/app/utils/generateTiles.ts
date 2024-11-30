import { TileType, TileColor } from "@/app/types/TileType"
import { PieceType, PieceName, PieceColor } from "@/app/types/PieceType";

export const generateTiles = (): TileType[] => {
  const tiles: TileType[] = [];

  const initialPieces = {
    0: [
      { pieceName: PieceName.rook, pieceColor: PieceColor.black },
      { pieceName: PieceName.knight, pieceColor: PieceColor.black },
      { pieceName: PieceName.bishop, pieceColor: PieceColor.black },
      { pieceName: PieceName.queen, pieceColor: PieceColor.black },
      { pieceName: PieceName.king, pieceColor: PieceColor.black },
      { pieceName: PieceName.bishop, pieceColor: PieceColor.black },
      { pieceName: PieceName.knight, pieceColor: PieceColor.black },
      { pieceName: PieceName.rook, pieceColor: PieceColor.black },
    ],
    1: Array(8).fill({ pieceName: PieceName.pawn, pieceColor: PieceColor.black }),
    6: Array(8).fill({ pieceName: PieceName.pawn, pieceColor: PieceColor.white }),
    7: [
      { pieceName: PieceName.rook, pieceColor: PieceColor.white },
      { pieceName: PieceName.knight, pieceColor: PieceColor.white },
      { pieceName: PieceName.bishop, pieceColor: PieceColor.white },
      { pieceName: PieceName.queen, pieceColor: PieceColor.white },
      { pieceName: PieceName.king, pieceColor: PieceColor.white },
      { pieceName: PieceName.bishop, pieceColor: PieceColor.white },
      { pieceName: PieceName.knight, pieceColor: PieceColor.white },
      { pieceName: PieceName.rook, pieceColor: PieceColor.white },
    ],
  };

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const tileColor = (row + col) % 2 === 0 ? TileColor.white : TileColor.black;
      const tilePosition = `${String.fromCharCode(65 + col)}${8 - row}`;

      let pieceOnTile: PieceType | null = null;

      //@ts-ignore
      if (initialPieces[row]) {
        const pieceConfig = initialPieces[row as keyof typeof initialPieces]?.[col];
        pieceOnTile = {
          ...pieceConfig,
          piecePosition: { tilePosition, tileColor, pieceOnTile: null, isHighlighted: false },
          allMoves: [],
          validMoves: [],
          isAlive: true,
          hasMoved: false,
        };
      }

      tiles.push({
        tilePosition,
        tileColor,
        pieceOnTile,
        isHighlighted: false,
      });
    }
  }

  return tiles;
};
