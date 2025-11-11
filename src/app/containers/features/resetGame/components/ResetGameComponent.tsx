type ResetGameComponentProps = {
  onReset: () => void;
};

const ResetGameComponent = ({ onReset }: ResetGameComponentProps) => {
  return (
    <div className="w-full h-32 flex items-center justify-center">
      <div
        onClick={onReset}
        className="bg-red-800 hover:bg-red-900 hover:cursor-pointer h-10 w-auto p-4 rounded-lg flex items-center justify-center"
      >
        <p className="text-white">Reset Game</p>
      </div>
    </div>
  );
};

export default ResetGameComponent;
