import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/features/tile/components/Tile";
import { resetTiles } from "@/app/containers/chessboard/utils/chessboard/design/resetTiles";
import { isMoveValid } from "@/app/containers/chessboard/utils/pieceMovements/helpers/isMoveValid";
import { handleValidMove } from "./utils/handleIsMoveValid";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";
import {
  selectCastling,
  selectChessboard,
  selectPrevClickedTile,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  selectAllEnemyMoves,
  selectCurrentPieceMoves,
  selectIsKingInCheck,
  selectPiecesAttackingKing,
  selectValidMovesWhenInCheck,
} from "@/app/utils/selectors/moveAnalysisStateSelector";
import { selectCurrentTurn } from "@/app/utils/selectors/gameStateSelectors";
import { CastleType, EnemyAttackType } from "@/app/types/MoveTypes";
import { tileClickHandler } from "./utils/tileClickHandler";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const dispatch = useDispatch();

  const chessboard: TileType[][] = useSelector(selectChessboard);
  const prevClickedTile: TileType | null = useSelector(selectPrevClickedTile);
  const castling: CastleType = useSelector(selectCastling);
  const isKingInCheck: boolean = useSelector(selectIsKingInCheck);
  const currentPieceMoves: number[][] = useSelector(selectCurrentPieceMoves);
  const validMovesWhenInCheck: number[][] = useSelector(
    selectValidMovesWhenInCheck
  );
  const piecesAttackingKing: EnemyAttackType[] = useSelector(
    selectPiecesAttackingKing
  );
  const allEnemyMoves: EnemyAttackType[] = useSelector(selectAllEnemyMoves);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);

  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;
  const isSameTeamAsPrev: boolean = pieceOnTile?.pieceColor === currentTurn;

  const handleTileClick = (clickedTile: TileType) => {
    // Select a piece to move
    if (!prevClickedTile || isSameTeamAsPrev) {
      tileClickHandler(
        dispatch,
        chessboard,
        currentTurn,
        clickedTile,
        isKingInCheck,
        piecesAttackingKing,
        validMovesWhenInCheck,
        allEnemyMoves
      );

      return;
    }

    // Check moves are valid
    if (
      isMoveValid(currentPieceMoves, clickedTile.tilePosition) &&
      prevClickedTile
    ) {
      handleValidMove(
        dispatch,
        prevClickedTile,
        clickedTile,
        chessboard,
        castling
      );

      return;
    }

    // Invalid Moves
    resetTiles(dispatch, chessboard);
  };

  return <Tile tile={tile} handleTileClick={handleTileClick} />;
};

export default TileContainer;
