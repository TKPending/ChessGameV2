import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import boardReducer from "./slices/board/boardSlice";
import { BoardType } from "@/app/types/BoardType";

interface State {
    board: BoardType;
}

const rootReducer: Reducer<State> = combineReducers({
    board: boardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
