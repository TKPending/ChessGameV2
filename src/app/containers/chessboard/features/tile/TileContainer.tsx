import { useSelector, useDispatch } from "react-redux";
import Tile from "@/app/containers/chessboard/features/tile/components/Tile";

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

import { resetTiles } from "@/app/containers/chessboard/utils/chessboard/design/resetTiles";
import { isMoveValid } from "@/app/containers/chessboard/utils/pieceMovements/helpers/isMoveValid";
import { selectCurrentTurn } from "@/app/utils/selectors/gameStateSelectors";
import { clearTileHighlights } from "@/app/containers/chessboard/utils/chessboard/design/clearTileHighlights";
import { generateSelectedPieceValidMoves } from "@/app/containers/chessboard/utils/pieceMovements/generateMoves/generateSelectedPiece";
import { getValidPieceMoves } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/getValidPieceMoves";
import { getKingSpecificMoves } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/getKingSpecificMoves";
import { isKingSafeAfterMove } from "@/app/containers/chessboard/utils/handlers/helpers/handPieceOnTileHelpers/isKingSafeAfterMove";
import { highlightValidMoves } from "@/app/containers/chessboard/utils/chessboard/design/highlightValidMoves";
import { handleMovePiece } from "@/app/containers/chessboard/utils/handlers/handleMovePiece";
import { getPlayerColor } from "@/app/utils/getPlayerColor";

import {
  setCurrentPiecePotentialMoves,
  setEnemyMoves,
  setPiecesAttackingKing,
} from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";
import {
  updateTile,
  setPreviousTile,
} from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { setCurrentTurn } from "@/app/redux/slices/gameState/gameStateSlice";
import { incrementMoveCounter } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";

import { TileType, PieceType, ChessColors } from "@/app/types/ChessTypes";
import { CastleType, EnemyAttackType } from "@/app/types/MoveTypes";

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

  const handleTileClick = (clickedTile: TileType) => {
    const pieceOnClickedTile: PieceType | null = clickedTile.pieceOnTile;
    const clickedWrongColorFirst: boolean | null =
      pieceOnClickedTile &&
      pieceOnClickedTile.pieceColor !== currentTurn &&
      !prevClickedTile;
    const isSameTeamAsPrev: boolean =
      pieceOnClickedTile?.pieceColor === currentTurn;

    // Check if selected piece belongs to the current player
    if (clickedWrongColorFirst) {
      resetTiles(dispatch, chessboard);
      return;
    }

    //
    // Select a piece to move
    if (!prevClickedTile || isSameTeamAsPrev) {
      // Clear previously highlighted tiles
      clearTileHighlights(dispatch, chessboard);

      // Highlight the selected tile
      dispatch(
        updateTile({
          ...clickedTile,
          isHighlighted: true,
          highlightReason: "selected",
        })
      );

      // Set the previous clicked tile in state
      dispatch(setPreviousTile(clickedTile));

      // Generate all valid moves for the selected piece
      const selectedPieceValidMoves: number[][] =
        generateSelectedPieceValidMoves(
          dispatch,
          chessboard,
          clickedTile,
          allEnemyMoves
        );

      // Get positions of pieces attacking the king
      const attackingPositions = piecesAttackingKing.map(
        (piece) => piece.piecePosition
      );

      // Determine valid moves considering check status
      let validPieceMoves: number[][] = getValidPieceMoves(
        isKingInCheck,
        attackingPositions,
        validMovesWhenInCheck,
        selectedPieceValidMoves
      );

      // Get king specific moves
      const kingSpecificMoves: number[][] = getKingSpecificMoves(
        dispatch,
        clickedTile,
        chessboard,
        allEnemyMoves,
        attackingPositions,
        currentTurn
      );

      // Combine all legal moves
      const enemyTeamColor: ChessColors = getPlayerColor(currentTurn, true);
      const pieceLegalMoves = [...validPieceMoves, ...kingSpecificMoves].filter(
        ([row, col]) =>
          !isKingSafeAfterMove(
            dispatch,
            chessboard,
            clickedTile,
            chessboard[row][col],
            currentTurn,
            enemyTeamColor
          )
      );

      // Highliht valid moves on the chessboard
      highlightValidMoves(dispatch, chessboard, pieceLegalMoves, currentTurn);
      // Store the potential moves in state
      dispatch(setCurrentPiecePotentialMoves(pieceLegalMoves));

      return;
    }

    // Check moves are valid
    if (
      isMoveValid(currentPieceMoves, clickedTile.tilePosition) &&
      prevClickedTile
    ) {
      // Move piece and update the chessboard state
      const updatedChessboard: TileType[][] | [] = handleMovePiece(
        dispatch,
        prevClickedTile,
        clickedTile,
        chessboard,
        castling
      );
      //
      resetTiles(dispatch, updatedChessboard);

      dispatch(setEnemyMoves([]));
      dispatch(setCurrentTurn());
      dispatch(incrementMoveCounter());
      dispatch(setPiecesAttackingKing(null));

      return;
    }

    // Invalid Moves
    resetTiles(dispatch, chessboard);
  };

  return <Tile tile={tile} handleTileClick={handleTileClick} />;
};

export default TileContainer;
