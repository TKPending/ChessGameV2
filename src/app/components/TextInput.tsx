import React from "react";

type Props = {
  value: string;
  invalidValue: boolean;
  isDisabled: boolean;
  customStyle?: string;
  placeholder: string;
  onPlayerNameChange: (newValue: string) => void;
};

const TextInput = ({
  value = "",
  invalidValue = false,
  isDisabled = false,
  customStyle,
  placeholder,
  onPlayerNameChange,
}: Props) => {
  const removeDefaultStyle: string =
    "appearance-none focus:outline-none focus:ring-0";

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    onPlayerNameChange(newValue);
  };

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <input
      value={value}
      onChange={handleOnChange}
      disabled={isDisabled}
      placeholder={placeholder}
      onKeyDown={handleOnEnter}
      className={`${customStyle} ${removeDefaultStyle} text-center border-2 border-black h-full w-full rounded-lg
            ${invalidValue ? "border-error-red" : ""}
            ${isDisabled && ""}
          `}
    />
  );
};

export default TextInput;
