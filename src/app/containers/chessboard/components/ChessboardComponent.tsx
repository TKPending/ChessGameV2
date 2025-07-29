import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import TileContainer from "../containers/TileContainer";
import { TileType } from "@/app/types/ChessTypes";

const ChessboardComponent = () => {
  const chessboard: TileType[][] = useSelector(
    (state: RootState) => state.chessboard.board
  );

  return (
    <div className="h-full w-full chessboard">
      {chessboard.map((row: TileType[], rowIndex: number) =>
        row.map((tile: TileType, colIndex: number) => (
          <TileContainer key={`${rowIndex}-${colIndex}`} tile={tile} />
        ))
      )}
    </div>
  );
};

export default ChessboardComponent;
