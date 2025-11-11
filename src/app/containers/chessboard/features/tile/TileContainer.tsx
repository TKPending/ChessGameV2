import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/features/tile/components/Tile";
import { resetTiles } from "@/app/utils/chessboard/design/resetTiles";
import { isMoveValid } from "@/app/utils/pieceMovements/helpers/isMoveValid";
import { handleFirstClick } from "./utils/handleFirstClick";
import { handleReClickSamePiece } from "./utils/handleReClickSamePiece";
import { handleValidMove } from "./utils/handleIsMoveValid";
import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const { chessboard, prevClickedTile, castling } = useSelector(
    (state: RootState) => state.chessboardState
  );
  const {
    isKingInCheck,
    currentPieceMoves,
    validMovesWhenInCheck,
    piecesAttackingKing,
    allEnemyMoves,
  } = useSelector((state: RootState) => state.moveAnalysisState);
  const currentTurn: ChessColors.black | ChessColors.white = useSelector(
    (state: RootState) => state.gameState.currentTurn
  );

  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;

  const handleTileClick = (clickedTile: TileType) => {
    if (!prevClickedTile) {
      handleFirstClick(
        dispatch,
        pieceOnTile,
        clickedTile,
        chessboard,
        isKingInCheck,
        piecesAttackingKing,
        validMovesWhenInCheck,
        allEnemyMoves,
        currentTurn
      );
      return;
    }

    if (
      pieceOnTile &&
      pieceOnTile.pieceColor === currentTurn &&
      clickedTile.tilePosition !== prevClickedTile.tilePosition
    ) {
      handleReClickSamePiece(
        dispatch,
        clickedTile,
        chessboard,
        isKingInCheck,
        piecesAttackingKing,
        validMovesWhenInCheck,
        allEnemyMoves,
        currentTurn
      );
      return;
    }

    if (isMoveValid(currentPieceMoves, clickedTile.tilePosition)) {
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
