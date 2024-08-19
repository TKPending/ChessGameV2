import PlayerNameInput from "@/app/components/gameSetup/PlayerNameInput";
import TimeAndRules from "@/app/components/gameSetup/TimeAndRules";

const GameSetupContainer = () => {
    return (
        <div className="bg-black h-screen w-screen flex flex-col items-center justify-center gap-12 mb-20">
            <PlayerNameInput playerNo="Player 1" />
            <PlayerNameInput playerNo="Player 2" />
        </div>
    )
};

export default GameSetupContainer;
