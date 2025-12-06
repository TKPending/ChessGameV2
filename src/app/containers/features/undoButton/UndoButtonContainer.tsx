import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Button from "@/app/components/Button";

import { selectIsRedoVisible } from "@/app/utils/selectors/gameStateSelectors";
import {
  selectChessboardHistory,
  selectPreviousGameState,
} from "@/app/utils/selectors/chessboardHistoryStateSelector";

import {
  setCurrentTurn,
  setGameStateToPrevious,
  setRedoVisibility,
} from "@/app/redux/slices/gameState/gameStateSlice";
import {
  removePreviousGameState,
  removeRecentChessboardHistory,
} from "@/app/redux/slices/chessboardHistory/chessboardHistorySlice";
import { setChessboard } from "@/app/redux/slices/chessboardState/chessboardStateSlice";
import { resetTiles } from "@/app/containers/chessboard/utils/chessboard/design/resetTiles";

import { GameStateType } from "@/app/types/StateTypes";
import { TileType } from "@/app/types/ChessTypes";

const UndoButtonContainer = () => {
  const dispatch = useDispatch();
  const isRedoVisible: boolean = useSelector(selectIsRedoVisible);
  const mostRecentGameState: GameStateType | null = useSelector(
    selectPreviousGameState
  );
  const chessboardHistory: TileType[][][] = useSelector(
    selectChessboardHistory
  );

  const handleUndo = () => {
    if (!isRedoVisible) {
      return;
    }

    if (mostRecentGameState) {
      dispatch(setGameStateToPrevious(mostRecentGameState));
      dispatch(removeRecentChessboardHistory());
      const previousChessboardState: TileType[][] =
        chessboardHistory[chessboardHistory.length - 1];
      dispatch(setChessboard(previousChessboardState));
      dispatch(setCurrentTurn());
      dispatch(setRedoVisibility(false));
      resetTiles(dispatch, previousChessboardState);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setRedoVisibility(false));
      dispatch(removePreviousGameState());
    }, 5000);
  }, [isRedoVisible]);

  return (
    <Button
      text="Undo"
      textStyle="text-lg lg:text-xl"
      className={`bg-customGreen ${
        !isRedoVisible && "bg-opacity-40"
      } text-white`}
      onClick={handleUndo}
    />
  );
};

export default UndoButtonContainer;
