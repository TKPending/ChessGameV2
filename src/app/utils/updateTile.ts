import { setTile } from "@/app/redux/slices/board/boardSlice";
import { TileType } from "@/app/types/TileType";

export const updateTile = (dispatch: any, updatedTile: TileType) => {
    dispatch(setTile({tile: updatedTile}));
}