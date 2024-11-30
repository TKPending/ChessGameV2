import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/redux/store";
import Tile from "@/app/components/game/Tile";
import { setChessboard } from "@/app/redux/slices/board/boardSlice";
import { generateTiles } from "@/app/utils/generateTiles";

const ChessboardContainer = () => {
  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState) => state.board.tiles);

  useEffect(() => {
    if (tiles.length === 0) {
      dispatch(setChessboard(generateTiles()));
    }
  }, [tiles, dispatch]);

  return (
    <div className="grid grid-cols-8 grid-rows-8 aspect-square w-full max-w-[80%] max-h-[80%] bg-gray-700">
      {tiles.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} tile={tile} />
        ))
      )}
    </div>
  );
};

export default ChessboardContainer;
