import { ChevronDown } from "lucide-react";
import DropdownOption from "@/app/containers/setup/rulesSetup/components/DropdownOption";

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
};

const Dropdown = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: DropdownProps) => {
  return (
    <div className="relative w-full mb-6">
      <div
        className="appearance-none w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-lg cursor-pointer"
        onClick={onToggle}
      >
        <p>{value}</p>
        <ChevronDown
          className="absolute right-4 top-3.5 text-gray-400"
          size={24}
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-gray-700 rounded-lg shadow-lg z-20">
          {options.map((opt) => (
            <DropdownOption
              key={opt}
              text={opt}
              onClick={() => onSelect(opt)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
