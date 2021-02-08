import React from "react";

const Input = ({ id, labelText, onChange, value, placeholder }) => {
  const handleInput = (event) => {
    onChange(event);
  };

  return (
    <div>
      <div>
        <label htmlFor={id}>{labelText}</label>
      </div>
      <div>
        <input
          id={id}
          onChange={handleInput}
          value={value}
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  );
};

export default Input;
