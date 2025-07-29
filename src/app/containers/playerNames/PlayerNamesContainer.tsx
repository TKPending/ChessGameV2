import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import PlayerNameInputContainer from "@/app/containers/playerNames/containers/PlayerNameInputContainer";
import ContinueButton from "@/app/containers/playerNames/components/ContinueButton";

const MIN_NAME_LENGTH = 2;

type Props = {
  transitionStyle: string;
  gameSetupStage: boolean;
};

const PlayerNamesContainer = ({ transitionStyle, gameSetupStage }: Props) => {
  const players = useSelector((state: RootState) => state.board.players);

  const validNames = players.every(
    (player) => player.playerName.length > MIN_NAME_LENGTH
  );

  return (
    <div
      className={`${transitionStyle} z-0 ${
        gameSetupStage
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-12 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-customGreen text-4xl font-semibold">
            Enter the name of each player
          </h1>
          <p className="text-red-600 text-xs">
            (Each player name must have 3 or more letters)
          </p>
        </div>

        {players.map((player, index) => (
          <PlayerNameInputContainer key={index} playerNo={player.no} />
        ))}

        <div
          className={`transition-opacity duration-500 ${
            validNames ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <ContinueButton />
        </div>
      </div>
    </div>
  );
};

export default PlayerNamesContainer;
