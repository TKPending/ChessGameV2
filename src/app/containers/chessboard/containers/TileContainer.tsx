import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/components/Tile";
import { resetTiles } from "@/app/utils/chessboard/design/resetTiles";
import { isMoveValid } from "@/app/utils/pieceMovements/helpers/isMoveValid";
import { handleFirstClick } from "./utils/handleFirstClick";
import { handleReClickSamePiece } from "./utils/handleReClickSamePiece";
import { handleValidMove } from "./utils/handleIsMoveValid";
import { EnemyAttackType, CastleType } from "@/app/types/MoveTypes";
import { TileType, PieceType } from "@/app/types/ChessTypes";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(
    (state: RootState) => state.chessboard.board
  );
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.chessboard.currentTurn
  );
  const previousClickedTile: TileType | null = useSelector(
    (state: RootState) => state.chessboard.previouslyClickedTile
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.chessboard.isKingInCheck
  );
  const validMoves: number[][] = useSelector(
    (state: RootState) => state.activeMoves.currentPiecePotentialMoves
  );
  const validCheckMoves: number[][] = useSelector(
    (state: RootState) => state.activeMoves.validCheckMoves
  );
  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;
  const enemyMoves: EnemyAttackType[] = useSelector(
    (state: RootState) => state.activeMoves.enemyMoves
  );
  const castling: CastleType = useSelector(
    (state: RootState) => state.chessboard.castling
  );
  const piecesAttackingKing = useSelector(
    (state: RootState) => state.activeMoves.pieceAttackingKing
  );

  const handleTileClick = (clickedTile: TileType) => {
    if (!previousClickedTile) {
      handleFirstClick(
        dispatch,
        pieceOnTile,
        clickedTile,
        chessboard,
        isInCheck,
        piecesAttackingKing,
        validCheckMoves,
        enemyMoves,
        currentTurn
      );
      return;
    }

    if (
      pieceOnTile &&
      pieceOnTile.pieceColor === currentTurn &&
      clickedTile.tilePosition !== previousClickedTile.tilePosition
    ) {
      handleReClickSamePiece(
        dispatch,
        clickedTile,
        chessboard,
        isInCheck,
        piecesAttackingKing,
        validCheckMoves,
        enemyMoves,
        currentTurn
      );
      return;
    }

    if (isMoveValid(validMoves, clickedTile.tilePosition)) {
      handleValidMove(
        dispatch,
        previousClickedTile,
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
