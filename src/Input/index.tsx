import React, { FC } from "react";

interface Inputs {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
}

const Input: FC<Inputs> = ({ onChange, value, placeholder }: Inputs) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default Input;
