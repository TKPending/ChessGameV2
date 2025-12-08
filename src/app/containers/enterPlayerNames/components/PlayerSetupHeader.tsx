/**
 * Renders text on Enter Player Name Page
 * @returns Text shown on 'Enter Player Name' Page
 */
const PlayerSetupHeader = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <p className="text-customGreen text-4xl md:text-6xl text-shadow-lg">
        Enter Player Names
      </p>
      <p className="text-white">
        (Each player must have at least 2 characters)
      </p>
    </div>
  );
};

export default PlayerSetupHeader;
