// import { useSelector, useDispatch } from "react-redux";
// import Tile from "@/app/containers/chessboard/components/Tile";

// import {
//   selectCurrentTeamMoves,
//   selectSelectedPieceMoves,
// } from "@/app/utils/selectors/moveAnalysisStateSelector";
// import {
//   selectCastling,
//   selectChessboard,
//   selectPrevClickedTile,
// } from "@/app/utils/selectors/chessboardStateSelectors";
// import {
//   setPreviousTile,
//   updateTile,
// } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
// import {
//   selectCurrentTurn,
//   selectIsPlaying,
// } from "@/app/utils/selectors/gameStateSelectors";
// import { setSelectedPieceMoves } from "@/app/redux/slices/moveAnalysis/moveAnalysisSlice";

// import { resetTiles } from "@/app/utils/chessboard/resetTiles";
// import { getPieceMoves } from "@/app/game/logic/pieceMovements/helpers/getPieceMoves";
// import { findEnemyTiles } from "@/app/game/logic/helpers/findEnemyTiles";
// import { handleMovePiece } from "@/app/game/logic/handlers/handleMovePiece";
// import {
//   incrementPlayerTime,
//   setCurrentTurn,
//   setRedoVisibility,
// } from "@/app/redux/slices/gameState/gameStateSlice";
// import { incrementMoveCounter } from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
// import { isMoveValid } from "@/app/game/logic/pieceMovements/helpers/isMoveValid";
// import { selectCurrentMoveCount } from "@/app/utils/selectors/chessboardHistoryStateSelector";
// import {
//   resetUiPreviousMoveTiles,
//   setUiAttackTiles,
//   setUiHighlightedTiles,
//   setUiPreviousMoveTile,
//   setUiSelectedTile,
// } from "@/app/redux/slices/uiChessboard/uiChessboardSlice";
// import { resetUiHighlights } from "@/app/utils/chessboard/resetUiHighlights";
// import { convertTilePosition } from "@/app/utils/convertTilePosition";

// import { EnemyAttackType } from "@/app/types/MoveTypes";
// import {
//   ChessColors,
//   PieceType,
//   TileType,
//   uiPreviousMoveType,
// } from "@/app/types/ChessTypes";
// import { selectUiPreviousMoveTile } from "@/app/utils/selectors/uiChessboardSelector";

// type Props = {
//   tile: TileType;
// };

// const TileContainer = ({ tile }: Props) => {
//   const dispatch = useDispatch();
//   const chessboard = useSelector(selectChessboard);
//   const isPlaying: boolean = useSelector(selectIsPlaying);
//   const currentTurn: ChessColors = useSelector(selectCurrentTurn);
//   const prevClickedTile: TileType | null = useSelector(selectPrevClickedTile);
//   const potentialMoves: EnemyAttackType[] = useSelector(selectCurrentTeamMoves);
//   const selectedPieceMoves: number[][] = useSelector(selectSelectedPieceMoves);
//   const uiPreviousMoveTile: uiPreviousMoveType = useSelector(
//     selectUiPreviousMoveTile
//   );
//   const moveCount: number = useSelector(selectCurrentMoveCount);
//   const castling = useSelector(selectCastling);

//   const handleTileClick = (clickedTile: TileType) => {
//     dispatch(setRedoVisibility(false));

//     // Viewing Mode
//     if (!isPlaying) {
//       return;
//     }

//     // Nothing Clicked
//     if (!prevClickedTile && !clickedTile.pieceOnTile) {
//       return;
//     }

//     // Clear previous highlighted tile
//     if (uiPreviousMoveTile.from !== "") {
//       dispatch(resetUiPreviousMoveTiles());
//     }

//     const pieceOnClickedTile: PieceType | null = clickedTile.pieceOnTile;
//     const clickedWrongColorFirst: boolean | null =
//       pieceOnClickedTile &&
//       pieceOnClickedTile.pieceColor !== currentTurn &&
//       !prevClickedTile;

//     // Clicked the wrong team first
//     if (clickedWrongColorFirst) {
//       resetUiHighlights(dispatch);
//       return;
//     }

//     // Reset Tiles if empty click
//     if (prevClickedTile && selectedPieceMoves) {
//       const [clickedRow, clickedCol] = convertTilePosition(
//         clickedTile.tilePosition
//       );

//       const isValidMove = selectedPieceMoves.some(
//         ([row, col]) => row === clickedRow && col === clickedCol
//       );

//       if (!isValidMove) {
//         resetUiHighlights(dispatch);
//       }
//     }

//     // Valid Click
//     const clickedSameTeam: boolean =
//       pieceOnClickedTile?.pieceColor === currentTurn;
//     if (!prevClickedTile || clickedSameTeam) {
//       resetUiHighlights(dispatch);
//       dispatch(setPreviousTile(clickedTile));

//       // Highlight selected tile
//       dispatch(updateTile(clickedTile));
//       dispatch(setUiSelectedTile(clickedTile));

//       // Filter out all legal moves for the current piece out of all team moves
//       const legalMoves: number[][] | null = getPieceMoves(
//         clickedTile,
//         potentialMoves
//       );

//       // If there are legal moves highlight tiles
//       if (legalMoves) {
//         dispatch(setUiHighlightedTiles(legalMoves));
//         dispatch(setSelectedPieceMoves(legalMoves));
//         dispatch(
//           setUiAttackTiles(findEnemyTiles(chessboard, legalMoves, currentTurn))
//         );
//       }

//       return;
//     }

//     // Check move is valid and move the piece
//     if (
//       isMoveValid(selectedPieceMoves, clickedTile.tilePosition) &&
//       prevClickedTile
//     ) {
//       handleMovePiece(
//         dispatch,
//         prevClickedTile,
//         clickedTile,
//         chessboard,
//         moveCount,
//         castling
//       );

//       // Reset the UI
//       resetTiles(dispatch);

//       // Set Previous tiles for highlight
//       dispatch(
//         setUiPreviousMoveTile({
//           from: prevClickedTile.tilePosition,
//           to: clickedTile.tilePosition,
//         })
//       );

//       // Reset Game States
//       dispatch(setRedoVisibility(true));
//       dispatch(incrementPlayerTime());
//       dispatch(incrementMoveCounter());
//       dispatch(setCurrentTurn());
//     }
//   };

//   return <Tile tile={tile} handleTileClick={handleTileClick} />;
// };

// export default TileContainer;
