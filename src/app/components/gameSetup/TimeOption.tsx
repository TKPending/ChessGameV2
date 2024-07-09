type Props = {
    timeOption: string;
    isPressed: boolean;
    onClick: () => void;
};

const TimeOption = ({ timeOption, isPressed, onClick }: Props) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div onClick={onClick} className={`cursor-pointer h-4 w-4 rounded-full ${isPressed ? "bg-red-200" : "bg-white"}`}></div>
            <p>{timeOption}</p>
        </div>
    )
};

export default TimeOption;
