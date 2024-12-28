type Props = {
  onClick: () => void;
};

const StartScreenLayout = ({ onClick }: Props) => {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col justify-center items-center gap-8 font-semibold">
      <p className="animate-from-left text-4xl">Play a game of Chess</p>
      <p
        className="animate-from-right text-3xl hover:cursor-pointer hover:text-white hover:bg-black hover:underline transition duration-200 bg-white text-black p-2 rounded-lg"
        onClick={onClick}
      >
        Play Now
      </p>
      <p className="animate-from-left text-xl">Created by Tony Koke</p>
    </div>
  );
};

export default StartScreenLayout;
