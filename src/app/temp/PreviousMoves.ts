import { PreviousMoveType } from "@/app/types/PreviousMoveType"
import { TileType, TileColor } from "@/app/types/TileType"
import { PieceType, PieceName } from "@/app/types/PieceType"

const mockTile = (position: string, color: TileColor): TileType => ({
  tilePosition: position,
  tileColor: color,
  pieceOnTile: null,
  isHighlighted: false,
});

const mockPiece = (
  pieceName: PieceName,
  pieceColor: "White" | "Black",
  position: string,
  color: TileColor
): PieceType => ({
  pieceName: pieceName,
  pieceColor: pieceColor,
  piecePosition: mockTile(position, color),
  allMoves: [],
  validMoves: [],
  isAlive: true,
  hasMoved: false,
});

export const mockPreviousMoves: PreviousMoveType[] = [
  {
    count: 1,
    pieceToMove: mockPiece(PieceName.pawn, "White", "e2", TileColor.white),
  },
  {
    count: 2,
    pieceToMove: mockPiece(PieceName.pawn, "Black", "e7", TileColor.black),
  },
  {
    count: 3,
    pieceToMove: mockPiece(PieceName.knight, "White", "g1", TileColor.white),
  },
  {
    count: 4,
    pieceToMove: mockPiece(PieceName.knight, "Black", "b8", TileColor.black),
  },
  {
    count: 5,
    pieceToMove: mockPiece(PieceName.bishop, "White", "f1", TileColor.white),
  },
];

// [
//     {
//       "move": 1,
//       "pieceToMove": {
//         "pieceName": "Pawn",
//         "pieceColor": "White",
//         "piecePosition": { "tilePosition": "e2", "tileColor": "white" },
//         "allMoves": [],
//         "validMoves": [],
//         "isAlive": true,
//         "hasMoved": false
//       }
//     },
//     {
//       "move": 2,
//       "pieceToMove": {
//         "pieceName": "Pawn",
//         "pieceColor": "Black",
//         "piecePosition": { "tilePosition": "e7", "tileColor": "black" },
//         "allMoves": [],
//         "validMoves": [],
//         "isAlive": true,
//         "hasMoved": false
//       }
//     },
//     ...
//   ]
  
