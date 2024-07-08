import React, { useState } from "react";

type Props = {
  value: string;
  validValue: boolean;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveValue: () => void;
};

const TextInput = ({ 
    value = "",
    validValue = false,
    isDisabled = false,
    onSaveValue,
    onChange,
 }: Props) => {
    const removeDefaultStyle: string = "appearance-none focus:outline-none focus:ring-0";

    const handleBlur = () => {
        onSaveValue();
    };

    const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

        }
    }

    return (
        <input 
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          onBlur={handleBlur}
          onKeyDown={handleOnEnter}
          className={`${removeDefaultStyle} border-2 border-black h-full w-full rounded-lg
            ${validValue ? "" : ""}
            ${isDisabled && "" }
          `} 
        />
    )
};

export default TextInput;