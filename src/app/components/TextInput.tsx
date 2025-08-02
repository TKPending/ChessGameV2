import React from "react";

type Props = {
  value: string;
  playerNo: number;
  invalidValue?: boolean;
  isDisabled?: boolean;
  customStyle?: string;
  placeholder: string;
  onChange: (newValue: string, playerNo: number) => void;
};

const TextInput = ({
  value = "",
  playerNo,
  invalidValue = false,
  isDisabled = false,
  customStyle,
  placeholder,
  onChange,
}: Props) => {
  const removeDefaultStyle: string =
    "appearance-none focus:outline-none focus:ring-0";

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;
    onChange(newValue, playerNo);
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
