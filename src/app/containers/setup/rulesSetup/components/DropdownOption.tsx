type DropdownOptionProps = {
  text: string;
  onClick: (text: string) => void;
};

export const DropdownOption = ({ text, onClick }: DropdownOptionProps) => {
  return (
    <div
      onClick={() => onClick(text)}
      className="appearance-none w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-lg hover:cursor-pointer"
    >
      <p>{text}</p>
    </div>
  );
};

export default DropdownOption;
