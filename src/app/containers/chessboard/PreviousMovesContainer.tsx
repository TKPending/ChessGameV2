import { useState } from "react";

const PreviousMovesContainer = () => {
  const [previousMovesHidden, setPreviousMovesHidden] = useState(false);

  const togglePreviousMoves = () => {
    setPreviousMovesHidden(!previousMovesHidden);
  };

  return (
    <div className="h-[90%] w-[20%] max-w-sm rounded-md p-4 overflow-auto">
      <p
        onClick={togglePreviousMoves}
        className={`text-black text-center bg-white text-xl p-4 ${!previousMovesHidden ? "rounded-tr-lg rounded-tl-lg" : "rounded-lg"} hover:cursor-pointer`}
      >
        {previousMovesHidden ? "Display Moves" : "Hide Moves"}
      </p>

      <div className={`${!previousMovesHidden && "h-full w-full bg-white"} rounded-br-lg rounded-bl-lg`}></div>
    </div>
  );
};

export default PreviousMovesContainer;
