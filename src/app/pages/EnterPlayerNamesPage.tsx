import EnterPlayerNamesContainer from "@/app/containers/enterPlayerNames/EnterPlayerNamesContainer";

/**
 * Renders the page for users to enter player names
 * @returns Enter Player Name Page
 */
const EnterPlayerNamesPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <EnterPlayerNamesContainer />
    </div>
  );
};

export default EnterPlayerNamesPage;
