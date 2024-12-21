import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PlayerNameInput from "@/app/components/playerSetupComponents/PlayerNameInput";
import ContinueButton from "@/app/components/playerSetupComponents/ContinueButton";

const PlayerNamesLayout = () => {
  const players = useSelector((state: RootState) => state.board.players);

  const validNames = () => {
    const playerOneName: string = players[0].playerName;
    const playerTwoName: string = players[1].playerName;

    if (playerOneName.length > 2 && playerTwoName.length > 2) {
      return true;
    }

    return false;
  };

  const showButton: boolean = validNames();

  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center gap-12">
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
