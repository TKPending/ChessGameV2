import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import boardReducer from "./slices/board/boardSlice";
import { BoardType } from "@/app/types/BoardType";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";
import previousMovesContainerReducer from "./slices/previousMoves/previousMovesSlice"

interface State {
    board: BoardType;
    previousMovesContainer: PreviousMovesContainerType
}

const rootReducer: Reducer<State> = combineReducers({
    board: boardReducer,
    previousMovesContainer: previousMovesContainerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
