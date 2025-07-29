import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/components/Tile";
import { resetTiles } from "@/app/utils/chessboard/design/resetTiles";
import { isMoveValid } from "@/app/utils/pieceMovements/helpers/isMoveValid";
import { handleFirstClick } from "./utils/handleFirstClick";
import { handleReClickSamePiece } from "./utils/handleReClickSamePiece";
import { handleValidMove } from "./utils/handleIsMoveValid";
import { CastleType } from "@/app/types/CastleType";
import { EnemyAttackType } from "@/app/types/EnemyAttackType";
import { PieceType } from "@/app/types/PieceType";
import { TileType } from "@/app/types/TileType";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const chessboard: TileType[][] = useSelector(
    (state: RootState) => state.board.chessboard
  );
  const currentTurn: "White" | "Black" = useSelector(
    (state: RootState) => state.board.currentTurn
  );
  const previousClickedTile: TileType | null = useSelector(
    (state: RootState) => state.board.previousClickedTile
  );
  const isInCheck: boolean = useSelector(
    (state: RootState) => state.board.isKingInCheck
  );
  const validMoves: number[][] = useSelector(
    (state: RootState) => state.board.piecePotentialMoves
  );
  const validCheckMoves: number[][] = useSelector(
    (state: RootState) => state.board.validCheckMoves
  );
  const pieceOnTile: PieceType | null = tile.pieceOnTile || null;
  const enemyMoves: EnemyAttackType[] = useSelector(
    (state: RootState) => state.board.enemyMoves
  );
  const castling: CastleType = useSelector(
    (state: RootState) => state.board.castling
  );
  const piecesAttackingKing = useSelector(
    (state: RootState) => state.board.pieceAttackingKing
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
