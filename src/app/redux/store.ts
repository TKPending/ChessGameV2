import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import boardReducer from "./slices/board/boardSlice";
import gameSetupReducer from "./slices/gameSetup/gameSetupSlice";
import { BoardType } from "@/app/types/BoardType";
import { GameSetupType } from "@/app/types/GameSetupType";

interface State {
    board: BoardType;
    gameSetup: GameSetupType;
}

const rootReducer: Reducer<State> = combineReducers({
    board: boardReducer,
    gameSetup: gameSetupReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
