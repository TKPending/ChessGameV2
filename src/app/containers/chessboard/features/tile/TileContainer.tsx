import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/features/tile/components/Tile";

import {
  selectCurrentTeamMoves,
  selectSelectedPieceMoves,
} from "@/app/utils/selectors/moveAnalysisStateSelector";
import {
  selectCastling,
  selectChessboard,
  selectPrevClickedTile,
} from "@/app/utils/selectors/chessboardStateSelectors";
import {
  setPreviousTile,
  updateTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import {
  selectCurrentTurn,
  selectIsPlaying,
} from "@/app/utils/selectors/gameStateSelectors";

import { resetTiles } from "@/app/containers/chessboard/utils/chessboard/design/resetTiles";
import { getPieceMoves } from "@/app/containers/chessboard/utils/pieceMovements/helpers/getPieceMoves";
import { highlightValidMoves } from "@/app/containers/chessboard/utils/chessboard/design/highlightValidMoves";
import { clearTileHighlights } from "@/app/containers/chessboard/utils/chessboard/design/clearTileHighlights";
import { handleMovePiece } from "@/app/containers/chessboard/utils/handlers/handleMovePiece";
import {
  incrementPlayerTime,
  setCurrentTurn,
  setRedoVisibility,
} from "@/app/redux/slices/gameState/gameStateSlice";
import { incrementMoveCounter } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";

import { EnemyAttackType } from "@/app/types/MoveTypes";
import { ChessColors, PieceType, TileType } from "@/app/types/ChessTypes";
import { setSelectedPieceMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import { isMoveValid } from "../../utils/pieceMovements/helpers/isMoveValid";

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
  const selectedPieceMoves: number[][] = useSelector(selectSelectedPieceMoves);
  const castling = useSelector(selectCastling);

  // TODO: Bug Double CLick to get move

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
      const legalMoves: number[][] | null = getPieceMoves(
        clickedTile,
        potentialMoves
      );
      if (!legalMoves) {
        return;
      }

      dispatch(setSelectedPieceMoves(legalMoves));
      highlightValidMoves(dispatch, chessboard, legalMoves, currentTurn);
      return;
    }

    // TODO: Make sure piece only moves to valid positions
    if (
      isMoveValid(selectedPieceMoves, clickedTile.tilePosition) &&
      prevClickedTile
    ) {
      const updatedChessboard: TileType[][] | [] = handleMovePiece(
        dispatch,
        prevClickedTile,
        clickedTile,
        chessboard,
        castling
      );

      resetTiles(dispatch, updatedChessboard);
      dispatch(setRedoVisibility(true));
      dispatch(incrementPlayerTime());
      dispatch(incrementMoveCounter());
      dispatch(setCurrentTurn());
    }
  };

  return <Tile tile={tile} handleTileClick={handleTileClick} />;
};

export default TileContainer;
