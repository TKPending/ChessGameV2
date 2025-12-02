import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/features/tile/components/Tile";
import { selectCurrentTeamMoves } from "@/app/utils/selectors/moveAnalysisStateSelector";
import {
  selectCastling,
  selectChessboard,
  selectClickedTile,
  selectPrevClickedTile,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  setCurrentTile,
  setPreviousTile,
  updateTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import {
  selectCurrentTurn,
  selectIsPlaying,
} from "@/app/utils/selectors/gameStateSelectors";
import { resetTiles } from "../../utils/chessboard/design/resetTiles";
import { EnemyAttackType } from "@/app/types/MoveTypes";
import { ChessColors, PieceType, TileType } from "@/app/types/ChessTypes";
import { getPieceMoves } from "../../utils/pieceMovements/helpers/getPieceMoves";
import { highlightValidMoves } from "../../utils/chessboard/design/highlightValidMoves";
import { clearTileHighlights } from "../../utils/chessboard/design/clearTileHighlights";
import { handleMovePiece } from "../../utils/handlers/handleMovePiece";
import {
  incrementPlayerTime,
  setCurrentTurn,
} from "@/app/redux/slices/gameState/gameStateSlice";

type Props = {
  tile: TileType;
};

const TileContainer = ({ tile }: Props) => {
  const dispatch = useDispatch();
  const chessboard = useSelector(selectChessboard);
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const currentTurn: ChessColors = useSelector(selectCurrentTurn);
  const prevClickedTile: TileType | null = useSelector(selectPrevClickedTile);
  const potentialMoves: EnemyAttackType[] = useSelector(selectCurrentTeamMoves);
  const castling = useSelector(selectCastling);

  const handleTileClick = (clickedTile: TileType) => {
    if (!isPlaying) {
      return;
    }

    // Nothing Clicked
    if (!prevClickedTile && !clickedTile.pieceOnTile) {
      return;
    }

    const pieceOnClickedTile: PieceType | null = clickedTile.pieceOnTile;
    const clickedWrongColorFirst: boolean | null =
      pieceOnClickedTile &&
      pieceOnClickedTile.pieceColor !== currentTurn &&
      !prevClickedTile;
    const isSameTeamAsPrev: boolean =
      pieceOnClickedTile?.pieceColor === currentTurn;

    if (clickedWrongColorFirst) {
      resetTiles(dispatch, chessboard);
      return;
    }

    if (!prevClickedTile || isSameTeamAsPrev) {
      clearTileHighlights(dispatch, chessboard);
      dispatch(
        updateTile({
          ...clickedTile,
          isHighlighted: true,
          highlightReason: "selected",
        })
      );

      dispatch(setPreviousTile(clickedTile));
      const pieceMoves: number[][] | null = getPieceMoves(
        clickedTile,
        potentialMoves
      );
      if (!pieceMoves) {
        return;
      }

      highlightValidMoves(dispatch, chessboard, pieceMoves, currentTurn);
      return;
    }

    if (prevClickedTile) {
      const updatedChessboard: TileType[][] | [] = handleMovePiece(
        dispatch,
        prevClickedTile,
        clickedTile,
        chessboard,
        castling
      );

      resetTiles(dispatch, updatedChessboard);
      dispatch(incrementPlayerTime());
      dispatch(setCurrentTurn());
    }
  };

  return <Tile tile={tile} handleTileClick={handleTileClick} />;
};

export default TileContainer;
