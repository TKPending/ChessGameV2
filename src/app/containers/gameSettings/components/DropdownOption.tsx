type DropdownOptionProps = {
  text: string;
  onClick: () => void;
};

/**
 * Renders the Dropdown Options
 * @param text Text to be shown for each option
 * @param onClick Handle changing the value to the option which is clicked
 * @returns Dropdown Option
 */
export const DropdownOption = ({ text, onClick }: DropdownOptionProps) => {
  return (
    <div
      onClick={onClick}
      className="appearance-none w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-lg hover:cursor-pointer"
    >
      <p>{text}</p>
    </div>
  );
};

export default DropdownOption;
