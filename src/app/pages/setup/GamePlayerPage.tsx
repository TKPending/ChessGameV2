import PlayerSetupContainer from "@/app/containers/setup/playerSetup/PlayerSetupContainer";

const GamePlayerPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <PlayerSetupContainer />
    </div>
  );
};

export default GamePlayerPage;
