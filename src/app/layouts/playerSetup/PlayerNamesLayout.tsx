import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PlayerNameInput from "@/app/components/playerSetupComponents/PlayerNameInput";
import ContinueButton from "@/app/components/playerSetupComponents/ContinueButton";

const MIN_NAME_LENGTH: number = 2;
const PLAYERONE: number = 0;
const PLAYERTWO: number = 1;

const PlayerNamesLayout = () => {
  const players = useSelector((state: RootState) => state.board.players);

  const validNames = () => {
    const playerOneName: string = players[PLAYERONE].playerName;
    const playerTwoName: string = players[PLAYERTWO].playerName;

    if (
      playerOneName.length > MIN_NAME_LENGTH &&
      playerTwoName.length > MIN_NAME_LENGTH
    ) {
      return true;
    }

    return false;
  };

  const showButton: boolean = validNames();

  return (
    <div className="landing-background animate-gradientAnimation h-screen w-screen flex flex-col items-center justify-center gap-12">
      <h1 className="text-white text-4xl font-semibold">
        Enter the name of each player
      </h1>
      <PlayerNameInput playerNo={players[0].no} />
      <PlayerNameInput playerNo={players[1].no} />

      {showButton ? <ContinueButton /> : <></>}
    </div>
  );
};

export default PlayerNamesLayout;
