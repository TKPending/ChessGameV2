type Props = {
  text: string;
  className: string;
  onClick: () => void;
};

const CheckmateButton = ({ text, className, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${className} flex items-center justify-center p-2 rounded-lg cursor-pointer hover:scale-105 transition duration-200 w-32`}
    >
      <p className="text-2xl">{text}</p>
    </div>
  );
};

export default CheckmateButton;
