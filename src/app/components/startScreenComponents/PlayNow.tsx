type Props = {
  onClick: () => void;
};

const PlayNow = ({ onClick }: Props) => {
  return (
    <div className="content flex flex-col gap-8 items-center justify-center">
      <div>
        <p className="animate-from-right text-2xl text-center text-gray-400 mb-4">
          Challenge a friend to a game of chess
        </p>
        <p className="animate-from-left text-5xl font-roboto font-bold text-customGreen mb-6">
          Your next move is waiting
        </p>
      </div>
      <button
        className="border-2 border-customGreen text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none"
        onClick={onClick}
      >
        Start Playing
      </button>
    </div>
  );
};

export default PlayNow;
