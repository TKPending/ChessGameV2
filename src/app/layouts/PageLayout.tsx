"use client"

import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import GameSetupLayout from "./GameSetupLayout";
import ChessboardLayout from "./ChessboardLayout";

const PageLayout = () => {
    const isPlaying: boolean = useSelector((state: RootState) => state.board.isPlaying);

    return (
        <div className="h-screen w-screen">
            {isPlaying ? <ChessboardLayout /> : <GameSetupLayout />}
        </div>
    )
};

export default PageLayout;
