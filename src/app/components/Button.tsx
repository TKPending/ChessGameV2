type ButtonProps = {
  text: string;
  className: string;
  onClick: () => void;
};

const Button = ({ text, className, onClick }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-lg cursor-pointer w-32 ${className} `}
    >
      <p className="text-2xl">{text}</p>
    </div>
  );
};

export default Button;
