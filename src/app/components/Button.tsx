type ButtonProps = {
  text: string;
  className: string;
  textStyle?: string;
  onClick: () => void;
};

const Button = ({ text, className, textStyle, onClick }: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center p-2 rounded-lg cursor-pointer w-32 ${className} `}
    >
      <p className={`md:text-2xl ${textStyle}`}>{text}</p>
    </div>
  );
};

export default Button;
