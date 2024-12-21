import { useDispatch } from "react-redux";
import { setIsChessGamePlaying } from "@/app/redux/slices/board/boardSlice";

const ContinueButton = () => {
    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(setIsChessGamePlaying(true));
    };

    return (
        <div onClick={handleOnClick} className="bg-white h-18 w-32 p-2 flex items-center justify-center rounded-xl cursor-pointer hover:bg-black hover:text-white hover:border-white border-2 transition duration-200">
            <p className="text-2xl font-semibold">PLAY!</p>
        </div>
    )
};

export default ContinueButton;