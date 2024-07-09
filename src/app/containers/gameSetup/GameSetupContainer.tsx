import PlayerNameInput from "@/app/components/gameSetup/PlayerNameInput";

const GameSetupContainer = () => {
    return (
        <div className="flex flex-col gap-4 h-[60%] w-[40%] items-center justify-center bg-page-background">
            <PlayerNameInput playerNo="Player 1" />
            <PlayerNameInput playerNo="Player 2" />
        </div>
    )
};

export default GameSetupContainer;
