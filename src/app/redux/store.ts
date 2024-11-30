import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";
import { ErrorType } from "@/app/types/ErrorType";
import { PlayingTileType } from "@/app/types/PlayingTilesType";
import boardReducer from "./slices/board/boardSlice";
import previousMovesReducer from "./slices/previousMoves/previousMovesSlice"
import errorReducer  from "./slices/error/errorSlice";
import playingTileReducer from "./slices/tile/tileSlice";

interface State {
    board: BoardType;
    previousMoves: PreviousMovesContainerType;
    error: ErrorType;
    tile: PlayingTileType
}

const rootReducer: Reducer<State> = combineReducers({
    board: boardReducer,
    previousMoves: previousMovesReducer,
    error: errorReducer,
    tile: playingTileReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
