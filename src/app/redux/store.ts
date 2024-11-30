import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { BoardType } from "@/app/types/BoardType";
import { PreviousMovesContainerType } from "@/app/types/PreviousMovesContainerType";
import { ErrorType } from "@/app/types/ErrorType";
import boardReducer from "./slices/board/boardSlice";
import previousMovesReducer from "./slices/previousMoves/previousMovesSlice"
import errorReducer  from "./slices/error/errorSlice";

interface State {
    board: BoardType;
    previousMoves: PreviousMovesContainerType;
    error: ErrorType;
}

const rootReducer: Reducer<State> = combineReducers({
    board: boardReducer,
    previousMoves: previousMovesReducer,
    error: errorReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
