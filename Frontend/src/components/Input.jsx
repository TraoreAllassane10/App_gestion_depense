import React from "react";

const Input = ({value, onChange, type, placeholder}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type ?? "text"}
      placeholder={placeholder}
      className="input w-full text-white"
      required
    />
  );
};

export default Input;
