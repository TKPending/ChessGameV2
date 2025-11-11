const PlayerSetupHeader = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <p className="text-customGreen text-4xl md:text-6xl">
        Enter Player Names
      </p>
      <p className="text-white">Each player must have atleast 2 characters</p>
    </div>
  );
};

export default PlayerSetupHeader;
